var http = require("http");
var ConfigService = require("./ConfigService");
var stringify = require('querystring-stable-stringify');
var platform = require("platform");
var AuthenticationService = require("./AuthenticationService");
var commonService = require("./CommonService");
// POST Call to an API
exports.Post = function (endpoint, content, successCallBack, errorCallBack, headers) {
	return pvtAPI("POST", endpoint, content, successCallBack, errorCallBack, headers);
};
// GET Call to an API
exports.GET = function (endpoint, content, successCallBack, errorCallBack, headers) {
	if (commonService.IsEmpty(AuthenticationService.GetAccessToken()) === false
		&& AuthenticationService.HasTokenExpired() === false)
		return pvtAPI("GET", endpoint, content, successCallBack, errorCallBack, headers);
	else {
		var refreshToken = RefreshToken();
		refreshToken.then(function () {
			return pvtAPI("GET", endpoint, content, successCallBack, errorCallBack, headers);
		});
	}
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
		url: ConfigService.apiUrl + endpoint,
		method: "POST",
		content: "UserName=" + content.UserName + "&Password=" + content.Password,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			"X-ClientType": "native_client",
			"X-DeviceId": platform.device.uuid
		}
	}).then(successCallBack).catch(errorCallBack);
};

exports.RefreshToken = RefreshToken;

//Private method to handle ajax call
function pvtAPI(method, endpoint, content, successCallBack, errorCallBack, headers) {

	if (!headers) {
		headers = {
			"Content-Type": "application/json",
			"X-ClientType": "native_client",
			"X-DeviceId": platform.device.uuid,
		}
	}

	var tokenData = AuthenticationService.GetToken();
	if (tokenData) {
		headers.Authorization = "Bearer " + tokenData.access_token;
	}
	//If get we dont need content property but we need content appended
	//to url as query string
	if (method === "GET") {
		if (!content) content = {};
		content.noCache = new Date().getTime();
		return http.request({
			url: ConfigService.apiUrl + endpoint + "?" + stringify(content),
			method: "GET",
			headers: headers
		}).then(successCallBack).catch(errorCallBack);
	}
	//else it is post
	//and content needs to be stringify
	return http.request({
		url: ConfigService.apiUrl + endpoint,
		method: method,
		content: JSON.stringify(content),
		headers: headers
	}).then(successCallBack).catch(errorCallBack);

}

function RefreshToken(successCallBack, includeUserInfo) {

	if (commonService.hasNull(AuthenticationService.GetUser()) === true)
		includeUserInfo = true;
	else
		includeUserInfo = false;

	var token = AuthenticationService.GetRefreshToken();
	if (commonService.IsEmpty(token) === false) {
		var data = "grant_type=" + "refresh_token" + "&refresh_token=" + token + "&inlcude_info=" + includeUserInfo;
		var request = http.request({
			url: ConfigService.apiUrl + "account/RefreshToken",
			method: "POST",
			content: data,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded "
			}
		});
		request.then(function (data) {
			var response = data.content.toJSON();
			if (includeUserInfo === false) {
				AuthenticationService.SetToken(response);
			}
			else {
				AuthenticationService.SetToken(response.tokenResponse);
				AuthenticationService.SetUser(response.userInfo);
			}
		}).catch(function (error) {
			alert(JSON.stringify(error));
		});
		return request;
	}
	else {
		throw Error("No refresh token");
	}
}