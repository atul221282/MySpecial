var mySpecialAPI = require("../../../shared/common/myspecialAPI-view-model");
var config = require("../../../shared/common/config");
var observable = require("data/observable");

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
		alert(JSON.stringify(viewModel.get("UserDetails")));
		
		mySpecialAPI.GET("protected/GetUserByEmail", { "emailAddress": viewModel.get("UserDetails").Name }
			, function (inData) {
				//alert(JSON.stringify(inData));
			}, function (error) {
				if(error)
					alert(JSON.stringify(error));
			}, void 0);
	}

}






