var IndexViewModel = require("./index-view-model");
var indexVM = new IndexViewModel();

//Page load event
module.exports = {
	navigatedTo: navigatedTo
	, GetUserDetails: GetUserDetails,
	UserDetails: {}
}


function navigatedTo(args) {
	var page = args.object;
	var context = page.navigationContext;
	page.bindingContext = context;
	UserDetails = context.UserDetails;
	indexVM.SetUser(context.UserDetails);
}


function GetUserDetails() {
	indexVM.GetUserDetails(UserDetails);
}