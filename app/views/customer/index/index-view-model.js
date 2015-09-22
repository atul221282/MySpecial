var APIService = require("../../../shared/common/APIService");
var observable = require("data/observable");
var AuthenticationService = require("../../../shared/common/AuthenticationService");
var moment = require("moment");

module.exports = customerIndexViewModel;

function customerIndexViewModel() {
	// You can add properties to observables on creation
	var viewModel = new observable.Observable();

	viewModel.UserDetails = {};
	viewModel.SetUser = SetUser;
	viewModel.GetUserDetails = GetUserDetails;
	
	var date = moment(AuthenticationService.GetToken().expires_at)
	var now = moment();
	if (now > date) {
   		viewModel.Difference = "Expired token";
	} else {
		viewModel.Difference = "Valid token";
	}
	viewModel.TokenDate = moment(AuthenticationService.GetToken().expires_at).format();
	viewModel.CurrentDate = moment.utc().format();
	viewModel.IsTokenExpired= AuthenticationService.HasTokenExpired(); 
	
	return viewModel;
	
	/*
	* @Description Temporarily stored variable
	* @note - TODO Save in application setting
	*/
	function SetUser(userDetails) {
		viewModel.set("UserDetails", userDetails);
	}
	
	/*
	* @Description Alert User details from temporarily stored variable
	* @note - TODO Get in application setting
	*/
	function GetUserDetails(value) {
		AuthenticationService.HasTokenExpired();
		//alert(JSON.stringify(AuthenticationService.GetUser()));
		APIService.GET("protected/GetUserByEmail", { "emailAddress": viewModel.get("UserDetails").Name }
			, function (inData) {
				alert(JSON.stringify(inData));
			}, function (error) {
				if(error)
					alert(JSON.stringify(error));
			}, void 0);
	}

}






