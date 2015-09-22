
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
		viewModel.set("isLoading",50);
		APIService.Login('account/LogIn', { 
					"UserName": viewModel.get("email"),
					"Password": viewModel.get("password") }, function (data) {
				var response=data.content.toJSON();
				var tokenData = response.tokenResponse;
				var userData = response.userInfo;
				
				APIService.SetAuthToken(tokenData.access_token);
				viewModel.set("isLoading",0);
				Navigate(topmost, PopulateUserFromServiceResponse(userData));
			}, function (error) {
				//we got an error
				viewModel.set("isLoading",0);
				alert(error);
			}, void 0);
    
	}
	
}

/*
* @Description Navgate user to details screen
*/
function Navigate(frame,userData){
	var navigationEntry = {
		moduleName: ConstantsService.customerHome,
		context: userData,
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
	var data = AuthenticationService.GetUser();
	return data;
}





