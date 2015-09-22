var APIService = require("../../../shared/common/APIService");
var observable = require("data/observable");
var AuthenticationService = require("../../../shared/common/AuthenticationService");

module.exports = customerIndexViewModel;

function customerIndexViewModel() {
	// You can add properties to observables on creation
	var viewModel = new observable.Observable();

	viewModel.UserDetails = {};
	viewModel.SetUser = SetUser;
	viewModel.GetUserDetails = GetUserDetails;
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






