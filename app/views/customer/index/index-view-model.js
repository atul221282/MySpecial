var mySpecialAPI = require("../../../shared/common/myspecialAPI-view-model");
var config = require("../../../shared/common/config");
var observable = require("data/observable");
var http = require("http");




function customerIndexViewModel(info) {
	
	// You can add properties to observables on creation
	var viewModel = new observable.Observable();
	
	viewModel.UserDetails = {};
	viewModel.SetUser = SetUser;
	
	return viewModel;
	
	function SetUser(userDetails){
		viewModel.UserDetails = userDetails;
	}
	
}

module.exports = customerIndexViewModel;




