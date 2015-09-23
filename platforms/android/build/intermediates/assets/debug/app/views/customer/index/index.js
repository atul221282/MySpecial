var IndexViewModel = require("./index-view-model");

//Page load event
exports.navigatedTo = navigatedTo;

/*
* @function Get fired when user come to this screen from navigation
*/
function navigatedTo(args) {
	var page = args.object;
	var context = page.navigationContext;
	var indexVM = new IndexViewModel(context.UserDetails);
	page.bindingContext = indexVM;
}


