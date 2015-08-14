var http = require("http");
var config = require("./config");
var observableModule = require("data/observable");

// POST Call to an API
exports.Post = function (endpoint, content, successCallBack, errorCallBack, headers) {
	return pvtAPI('POST', endpoint, content, successCallBack, errorCallBack, headers);
};
// GET Call to an API
exports.GET = function (endpoint, content, successCallBack, errorCallBack, headers) {
	debugger;
	return pvtAPI('GET', endpoint, content, successCallBack, errorCallBack, headers);
};
// POST Call to an API
exports.UnPost = function (endpoint, content, successCallBack, errorCallBack, headers) {
	return pvtAPI('POST', endpoint, content, successCallBack, errorCallBack, headers);
};
// GET Call to an API
exports.UnGET = function (endpoint, content, successCallBack, errorCallBack, headers) {
	return pvtAPI('GET', endpoint, content, successCallBack, errorCallBack, headers);
};
//Login Call to API
exports.Login = function (endpoint, content, successCallBack, errorCallBack, headers) {
	return http.request({
		url: config.authUrl + endpoint,
		method: "POST",
		content: JSON.stringify(content),
		headers: {
			"Content-Type": "application/json",
			"X-ClientType": "native_client"
		}
	}).then(successCallBack).catch(errorCallBack);
};

exports.SetAuthToken = function (authToken) {
	config.authToken = "Bearer " + authToken;
};

function pvtAPI(method, endpoint, content, successCallBack, errorCallBack, headers) {

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

