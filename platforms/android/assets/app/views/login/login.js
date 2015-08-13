var loginViewModel = require("./login-view-model");


exports.pageLoaded=function(args) {
	debugger;
    var page = args.object;
    page.bindingContext = loginViewModel;
}

exports.signIn = function() {
	debugger;
	loginViewModel.LoginViewModel.Login();
}
