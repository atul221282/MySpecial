var mySpecialAPI = require("../../../shared/common/myspecialAPI-view-model");
var config = require("../../../shared/common/config");
var observable = require("data/observable");
var http = require("http");




function customerIndexViewModel(info) {
	info = info || {};
	// You can add properties to observables on creation
	var viewModel = new observable.Observable({
		UserDetails: info
	});

	viewModel.UserDetails = {};
	viewModel.SetUser = SetUser;
	viewModel.GetUserDetails = GetUserDetails;
	return viewModel;

	function SetUser(userDetails) {
		viewModel.UserDetails = userDetails;
		viewModel.set("UserDetails", userDetails);
	}
	function GetUserDetails(value) {
		debugger;
		viewModel.set("UserDetails",value);
		alert(JSON.stringify(viewModel.get("UserDetails")));
	}

}

module.exports = customerIndexViewModel;




