var mySpecialAPI = require("../../shared/common/myspecialAPI-view-model");
var observable = require("data/observable");
var http = require("http");


var loginViewModel = {

	Login: function () {

		var hh = http;
        debugger;

		mySpecialAPI.Login('Audience/SetClient', { "UserName": 'SuperUser', "Password": 'SuperUser' }, function (data) {
			mySpecialAPI.SetAuthToken(data.content.toJSON().access_token);
			mySpecialAPI.GET("protected", void 0, function (inData) {
				alert(JSON.stringify(inData));
			}, function (error) {
				alert(JSON.stringify(error));
			}, void 0);
		}, function (error) {
			alert(error);
		}, void 0);
    }
};

exports.LoginViewModel = loginViewModel;

