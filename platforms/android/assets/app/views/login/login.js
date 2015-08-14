var LoginViewModel = require("./login-view-model");

var loginVM = new LoginViewModel({
	email: "SuperUser",
	password: "SuperUser"
});

exports.pageLoaded = pageLoaded;
exports.signIn = signIn;


function pageLoaded(args){
	var page = args.object;
    page.bindingContext = loginVM;
}

function signIn () {
	loginVM.Login();
}
