
var mySpecialAPI = require("../../../shared/common/myspecialAPI-view-model");
var config = require("../../../shared/common/config");
var observable = require("data/observable");
var http = require("http");
var frameModule = require("ui/frame");


function loginViewModel(info) {
	info = info || {};

	// You can add properties to observables on creation
	var viewModel = new observable.Observable({
		email: info.email || "",
		password: info.password || "",
		isLoading:info.isLoading||0
	});
	
	viewModel.Login = Login;
	

	return viewModel;
	
	
	function Login(){
		var topmost = frameModule.topmost();
		viewModel.set("isLoading",50);
		mySpecialAPI.Login('account/LogIn', { 
					"UserName": viewModel.get("email"),
					"Password": viewModel.get("password") }, function (data) {
				var response=data.content.toJSON();
				var tokenData = response.tokenResponse;
				var userData = response.userInfo;
				
				mySpecialAPI.SetAuthToken(tokenData.access_token);
				
					viewModel.set("isLoading",0);
					//Create user object for navigation
					var result={"UserDetails":{
						Name: userData.Name,
						family_name: userData.family_name,
						given_name: userData.given_name,
						permissions: userData.permissions,
						role: userData.role,
						user_name:userData.given_name + " " + userData.family_name
					}};
					
					//TODO"Navigate user as per their roles"
					//Create navigation object for customr index
					var navigationEntry = {
						moduleName: "./views/customer/index/index",
						context: result,
						animated: true
					};
					//navigate to screen
					topmost.navigate(navigationEntry);
			}, function (error) {
				//we got an error
				viewModel.set("isLoading",0);
				alert(error);
			}, void 0);
    
	}
}

module.exports = loginViewModel;




