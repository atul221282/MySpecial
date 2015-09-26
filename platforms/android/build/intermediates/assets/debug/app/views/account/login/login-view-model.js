
var APIService = require("../../../shared/common/APIService");
var ConstantsService = require("../../../shared/common/ConstantsService");
var observable = require("data/observable");
var http = require("http");
var frameModule = require("ui/frame");
var AuthenticationService = require("../../../shared/common/AuthenticationService");
var commonService = require("../../../shared/common/CommonService");
module.exports = loginViewModel;

/*
* @Description View model for login screen
*/
function loginViewModel(info) {

	info = info || {};

	// You can add properties to observables on creation
	var viewModel = new observable.Observable({
		email: info.email || "",
		password: info.password || "",
		isLoading:info.isLoading||0
	});
	viewModel.IsUserLoggedIn = IsUserLoggedIn;
	viewModel.Login = Login;
	
	return viewModel;
	
	/*
	* @Description Event get executed when user hit login button
	*/
	function Login(){
		var topmost = frameModule.topmost();
		
		
		
			viewModel.set("isLoading",50);
			APIService.Login('account/LogIn', { 
						"UserName": viewModel.get("email"),
						"Password": viewModel.get("password") }, function (data) {
					var response=data.content.toJSON();
					SetAuthToken(response.tokenResponse);
					SetUser(response.userInfo);
					viewModel.set("isLoading",0);
					Navigate(topmost);
				}, function (error) {
					viewModel.set("isLoading",0);
					alert(error);
				}, void 0);
			
	}
	
	/*
	* @description Check if user is already logged in and if yes 
	* navigate user to their respective screen
	*/
	function IsUserLoggedIn(){
		var topmost = frameModule.topmost();
		alert(JSON.stringify(AuthenticationService.IsUserLoggedIn()));
		if(AuthenticationService.IsUserLoggedIn()===true){
			Navigate(topmost);
		}
	}
	
}

/*
* @Description Navgate user to details screen
*/
function Navigate(frame){
	var navigationEntry = {
		moduleName: ConstantsService.customerHome,
		context: AuthenticationService.GetUser(),
		animated: true
	};
	//navigate to screen
	frame.navigate(navigationEntry);
}
	
/*
* @Description Private function to populate user Data from ajax response 
*/
function SetUser(userData){
	AuthenticationService.SetUser(userData);
}

/*
* @Description Private function to populate user Data from ajax response 
*/
function SetAuthToken(tokenData){
	AuthenticationService.SetToken(tokenData);
}