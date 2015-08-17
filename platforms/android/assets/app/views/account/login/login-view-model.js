var mySpecialAPI = require("../../../shared/common/myspecialAPI-view-model");
var config = require("../../../shared/common/config");
var observable = require("data/observable");
var http = require("http");
var frameModule = require("ui/frame");
var IndexViewModel = require("../../../views/customer/index/index-view-model");
var indexViewModel = new IndexViewModel();

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
		mySpecialAPI.Login('Audience/SetClient', { 
					"UserName": viewModel.get("email"),
					"Password": viewModel.get("password") }, function (data) {
						
				mySpecialAPI.SetAuthToken(data.content.toJSON().access_token);
				
				mySpecialAPI.GET("protected", void 0, function (inData) {
					viewModel.set("isLoading",0);
					//Create user object for navigation
					var result={"UserDetails":{
						"userName":inData.content.toJSON()[0].Value	
					}};
					
					indexViewModel.SetUser(result.UserDetails);
					//TODO"Navigate user as per their roles"
					//Create navigation object for customr index
					var navigationEntry = {
						moduleName: "./views/customer/index/index",
						context: result,
						animated: false
					};
					//navigate to screen
					topmost.navigate(navigationEntry);
				}, function (error) {
					//we got an error
					alert(error);
					viewModel.set("isLoading",0);
				}, void 0);
			}, function (error) {
				//we got an error
				viewModel.set("isLoading",0);
				alert(error);
			}, void 0);
    
	}
}

module.exports = loginViewModel;




