var mySpecialAPI = require("../../shared/common/myspecialAPI-view-model");
var observable = require("data/observable");
var http = require("http");

function LoginVM(info) {
	info = info || {};

	// You can add properties to observables on creation
	var viewModel = new observable.Observable({
		email: info.email || "",
		password: info.password || "",

	});
	viewModel.Login = Login;
	
	return viewModel;
	
	
	
	function Login(){
		mySpecialAPI.Login('Audience/SetClient', { 
					"UserName": viewModel.get("email"),
					"Password": viewModel.get("password") }, function (data) {
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
}




module.exports = LoginVM;




