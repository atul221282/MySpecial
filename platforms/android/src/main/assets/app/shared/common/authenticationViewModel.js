var applicationSettings = require("application-settings");

function AuthenticationVm(){
	
}

/*
* @Description Set user data in application setting
*/
AuthenticationVm.prototype.SetUser = function(userData){
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

AuthenticationVm.prototype.GetUser = function(){
	if(applicationSettings.hasKey("User")===true)
		return JSON.parse(applicationSettings.getString("User"));
	else
		return void 0;
}