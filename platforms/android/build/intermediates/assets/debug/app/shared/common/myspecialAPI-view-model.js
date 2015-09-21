var http = require("http");
var config = require("./config");
var stringify = require('querystring-stable-stringify');
var platform = require("platform");

// POST Call to an API
exports.Post = function (endpoint, content, successCallBack, errorCallBack, headers) {
	return pvtAPI("POST", endpoint, content, successCallBack, errorCallBack, headers);
};
// GET Call to an API
exports.GET = function (endpoint, content, successCallBack, errorCallBack, headers) {
	return pvtAPI("GET", endpoint, content, successCallBack, errorCallBack, headers);
};
//Unauthorised POST Call to an API
exports.UnPost = function (endpoint, content, successCallBack, errorCallBack, headers) {
	return pvtAPI("POST", endpoint, content, successCallBack, errorCallBack, headers);
};
// Unauthorised GET Call to an API
exports.UnGET = function (endpoint, content, successCallBack, errorCallBack, headers) {
	return pvtAPI("GET", endpoint, content, successCallBack, errorCallBack, headers);
};
//Login Call to API
exports.Login = function (endpoint, content, successCallBack, errorCallBack, headers) {
	
	return http.request({
		url: config.apiUrl + endpoint,
		method: "POST",
		content: "UserName="+content.UserName+"&Password="+content.Password,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			"X-ClientType": "native_client",
			"X-DeviceId":platform.device.uuid
		}
	}).then(successCallBack).catch(errorCallBack);
};

exports.SetAuthToken = function (authToken) {
	config.authToken = "Bearer " + authToken;
};

exports.headers = {
	"Content-Type": "application/json",
	"X-ClientType": "native_client",
	"X-DeviceId":platform.device.uuid
}
//Private method to handle ajax call
function pvtAPI(method, endpoint, content, successCallBack, errorCallBack, headers) {
	//If get we dont need content property but we need content appended
	//to url as query string
	if (method === "GET") {
		
		if (!content) content = {};
		content.noCache = new Date().getTime();
		return http.request({
			url: config.apiUrl + endpoint + "?" + stringify(content),
			method: "GET",
			headers: !headers ? {
				"Content-Type": "application/json",
				"X-ClientType": "native_client",
				"Authorization": config.authToken,
				"X-DeviceId":platform.device.uuid
			} : headers
		}).then(successCallBack).catch(errorCallBack);
	}
	//else it is post
	//and content needs to be stringify
	return http.request({
		url: config.apiUrl + endpoint,
		method: method,
		content: JSON.stringify(content),
		headers: !headers ? {
			"Content-Type": "application/json",
			"X-ClientType": "native_client",
			"Authorization": config.authToken
		} : headers
	}).then(successCallBack).catch(errorCallBack);

}

