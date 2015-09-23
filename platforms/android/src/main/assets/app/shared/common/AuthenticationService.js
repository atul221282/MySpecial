var observable = require("data/observable");
var applicationSettings = require("application-settings");
var moment = require("moment");

module.exports = {
	SetUser : SetUser,
	GetUser : GetUser,
	SetToken : SetToken,
	GetToken : GetToken,
	HasTokenExpired:HasTokenExpired
};

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

/*
* @Description Get user data application setting
*/
function GetUser(){
	if(applicationSettings.hasKey("User")===true)
		return JSON.parse(applicationSettings.getString("User"));
	else
		return void 0;
}

/*
* @fDescription Set token data in application setting
*/
function SetToken(tokenData){
	tokenData.expires_at=moment().add(tokenData.expires_in,"s");
	applicationSettings.setString("token_data", JSON.stringify(tokenData));
}

/*
* @fDescription Set token data in application setting
*/
function GetToken(){
	//TODO :Also Check if it is not expired
	if(applicationSettings.hasKey("token_data")===true)
		return JSON.parse(applicationSettings.getString("token_data"));
	else
		return void 0;
}

function HasTokenExpired(){
	if(applicationSettings.hasKey("token_data")===true){
		var date = moment(GetToken().expires_at)
		var now = moment();
		if (now > date) {
			return true;
		} else {
			
			return false;
		}
	}
	throw Error("No token data");
}