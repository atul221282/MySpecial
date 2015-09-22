var observable = require("data/observable");
var applicationSettings = require("application-settings");

module.exports = AuthenticationVm;


function AuthenticationVm(){
	var viewModel = new observable.Observable();
	viewModel.SetUser = SetUser;
	viewModel.GetUser = GetUser;
	return viewModel
}
/*
* @Description Set user data in application setting
*/
function SetUser(userData){
	if(userData){
		
		var result={"UserDetails":{
			Name: userData.Name,
			family_name: userData.family_name,
			given_name: userData.given_name,
			permissions: userData.permissions,
			role: userData.role,
			user_name:userData.given_name + " " + userData.family_name
		}};
		applicationSettings.setString("User", JSON.stringify(result));
	}

}

function GetUser(){
	if(applicationSettings.hasKey("User")===true)
		return JSON.parse(applicationSettings.getString("User"));
	else
		return void 0;
}