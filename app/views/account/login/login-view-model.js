
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
				Navigate(topmost, userData);
			}, function (error) {
				//we got an error
				viewModel.set("isLoading",0);
				alert(error);
			}, void 0);
    
	}
	/*
	* @description Navgate user to details screen
	*/
	function Navigate(frame,userData){
		var navigationEntry = {
			moduleName: "./views/customer/index/index",
			context: PopulateUserFromServiceResponse(userData),
			animated: true
		};
		//navigate to screen
		frame.navigate(navigationEntry);
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





