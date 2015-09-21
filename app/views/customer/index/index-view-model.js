var mySpecialAPI = require("../../../shared/common/myspecialAPI-view-model");
var config = require("../../../shared/common/config");
var observable = require("data/observable");


function customerIndexViewModel() {
	// You can add properties to observables on creation
	var viewModel = new observable.Observable();

	viewModel.UserDetails = {};
	viewModel.SetUser = SetUser;
	viewModel.GetUserDetails = GetUserDetails;
	return viewModel;

	function SetUser(userDetails) {
		viewModel.set("UserDetails", userDetails);
	}

	function GetUserDetails(value) {
		alert(JSON.stringify(viewModel.get("UserDetails")));
		
		mySpecialAPI.GET("protected/GetUserByEmail", { "emailAddress": viewModel.get("UserDetails").Name }
			, function (inData) {
				alert(JSON.stringify(inData));
			}, function (error) {
				if(error)
				alert(JSON.stringify(error));
			}, void 0);
	}

}

module.exports = customerIndexViewModel;




