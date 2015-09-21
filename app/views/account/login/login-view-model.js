
var mySpecialAPI = require("../../../shared/common/myspecialAPI-view-model");
var config = require("../../../shared/common/config");
var observable = require("data/observable");
var http = require("http");
var frameModule = require("ui/frame");

module.exports = loginViewModel;


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
	
	/*
	* @Description Event get executed when user hit login button
	*/
	function Login(){
		viewModel.set("isLoading",50);
		mySpecialAPI.Login('account/LogIn', { 
					"UserName": viewModel.get("email"),
					"Password": viewModel.get("password") }, function (data) {
				var response=data.content.toJSON();
				mySpecialAPI.SetAuthToken(response.tokenResponse);
				viewModel.set("isLoading",0);
				Navigate(response.userInfo);
			}, function (error) {
				//we got an error
				viewModel.set("isLoading",0);
				alert(error);
			}, void 0);
	}
	
	function Navigate(userData){
		var topmost = frameModule.topmost();
		//TODO"Navigate user as per their roles"
		//Create navigation object for customr index
		var navigationEntry = {
			moduleName: "./views/customer/index/index",
			ontext: PopulateUserFromServiceResponse(userData),
			animated: true
		};
		//navigate to screen
		topmost.navigate(navigationEntry);
	}
	
	/*
	* @Description Private function to populate user Data from ajax response 
	*/
	function PopulateUserFromServiceResponse(userData){
		//Create user object for navigation
		var result={"UserDetails":{
			Name: userData.Name,
			family_name: userData.family_name,
			given_name: userData.given_name,
			permissions: userData.permissions,
			role: userData.role,
			user_name:userData.given_name + " " + userData.family_name
		}};
		return result;
	}
}





