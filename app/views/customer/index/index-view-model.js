var mySpecialAPI = require("../../../shared/common/myspecialAPI-view-model");
var config = require("../../../shared/common/config");
var observable = require("data/observable");
var http = require("http");




function customerIndexViewModel() {
	// You can add properties to observables on creation
	var viewModel = new observable.Observable();

	viewModel.UserDetails = {};
	viewModel.SetUser = SetUser;
	viewModel.GetUserDetails = GetUserDetails;
	return viewModel;

	function SetUser(userDetails) {
		viewModel.UserDetails = userDetails;
		viewModel.set("UserDetails", userDetails);
	}

	function GetUserDetails(value) {
		viewModel.set("UserDetails", value);
		debugger;
		mySpecialAPI.GET("protected/GetUserByEmail", { "emailAddress": viewModel.get("UserDetails").userName }
			, function (inData) {
				alert(JSON.stringify(inData));
			}, function (error) {
				alert(JSON.stringify(error));
				alert("error");
			}, void 0);
	}

}

module.exports = customerIndexViewModel;




