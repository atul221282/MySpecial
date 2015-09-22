
var APIService = require("../../../shared/common/APIService");
var ConstantsService = require("../../../shared/common/ConstantsService");
var observable = require("data/observable");
var http = require("http");
var frameModule = require("ui/frame");
var AuthenticationService = require("../../../shared/common/AuthenticationService");

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
	
	viewModel.Login = Login;
	
	return viewModel;
	
	/*
	* @Description Event get executed when user hit login button
	*/
	function Login(){
		var topmost = frameModule.topmost();
		
		if(AuthenticationService.GetToken() && AuthenticationService.HasTokenExpired()===false){
			Navigate(topmost);
		}
		else{
			viewModel.set("isLoading",50);
			APIService.Login('account/LogIn', { 
						"UserName": viewModel.get("email"),
						"Password": viewModel.get("password") }, function (data) {
					var response=data.content.toJSON();
					SetAuthToken(response.tokenResponse);
					PopulateUserFromServiceResponse(response.userInfo);
					APIService.SetAuthToken(response.tokenResponse.access_token);
					viewModel.set("isLoading",0);
					Navigate(topmost);
				}, function (error) {
					//we got an error
					viewModel.set("isLoading",0);
					alert(error);
				}, void 0);
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
function PopulateUserFromServiceResponse(userData){
	AuthenticationService.SetUser(userData);
}

/*
* @Description Private function to populate user Data from ajax response 
*/
function SetAuthToken(tokenData){
	AuthenticationService.SetToken(tokenData);
}







