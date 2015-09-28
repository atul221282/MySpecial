var APIService = require("../../../shared/common/APIService");
var observable = require("data/observable");
var AuthenticationService = require("../../../shared/common/AuthenticationService");
var moment = require("moment");

module.exports = customerIndexViewModel;

function customerIndexViewModel(info) {
	info = info || {};
	// You can add properties to observables on creation
	var viewModel = new observable.Observable({
		UserDetails: info
	});
	viewModel.SetUser = SetUser;
	viewModel.GetUserDetails = GetUserDetails;

	viewModel.set("IsTokenExpired", AuthenticationService.HasTokenExpired());
	viewModel.set("AccessToken", AuthenticationService.GetToken().access_token);

	return viewModel;
	
	/*
	* @Description Temporarily stored variable
	* @note - TODO Save in application setting - Ben
	*/
	function SetUser(userDetails) {
		viewModel.set("UserDetails", userDetails);
	}
	
	/*
	* @Description Alert User details from temporarily stored variable
	* @note - TODO Get in application setting
	*/
	function GetUserDetails() {
		viewModel.set("IsTokenExpired", AuthenticationService.HasTokenExpired());
		viewModel.set("AccessToken", AuthenticationService.GetToken().access_token);
		//alert(JSON.stringify(AuthenticationService.GetUser()));
		APIService.GET("protected/GetUserByEmail", { 
			"emailAddress": viewModel.get("UserDetails").Name }
			, function (inData) {
				alert(JSON.stringify(inData));
			}, function (error) {
				alert(JSON.stringify(error));
			}, void 0);
	}

}






