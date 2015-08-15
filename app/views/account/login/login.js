var LoginViewModel = require("./login-view-model");

var loginVM = new LoginViewModel({
	email: "bsharma2422@gmail.com",
	password: "123456"
});

//Page load event
exports.pageLoaded = pageLoaded;
//When user click sign in button
exports.signIn = signIn;


function pageLoaded(args){
	var page = args.object;
    page.bindingContext = loginVM;
}

function signIn () {
	loginVM.Login();
}
