var IndexViewModel = require("./index-view-model");

var indexVM = new IndexViewModel();

//Page load event
exports.pageLoaded = pageLoaded;
//When user click sign in button

function pageLoaded(args) {
	debugger;
	var page = args.object;
    page.bindingContext = indexVM;
}