var applicationSettings = require("application-settings");
var moment = require("moment");


module.exports = {
	SetUser : SetUser,
	GetUser : GetUser,
	SetToken : SetToken,
	GetToken : GetToken,
	HasTokenExpired : HasTokenExpired,
	GetAccessToken : GetAccessToken,
	GetRefreshToken : GetRefreshToken
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
* @Description Set token data in application setting
*/
function SetToken(tokenData){
	var tokenResponse = {
		"access_token":tokenData.access_token,
		"refresh_token":tokenData.refresh_token,
		"expires_at":moment().add(tokenData.expires_in+300,"s")
	}
	applicationSettings.setString("token_data", JSON.stringify(tokenResponse));
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

/*
* @Description Return the access token or empty string
*/
function GetAccessToken(){
	if(applicationSettings.hasKey("token_data")===true)
		return JSON.parse(applicationSettings.getString("token_data")).access_token;
	else
		return void 0;
}

/*
* @Description Return the refresh token or empty string
*/
function GetRefreshToken(){
	if(applicationSettings.hasKey("token_data")===true)
		return JSON.parse(applicationSettings.getString("token_data")).refresh_token;
	else
		return void 0;
}

/*
* @Decription Return true if token has expired else false
*/
function HasTokenExpired(){
	if(applicationSettings.hasKey("token_data")===true){
		//moment() is current date
		return (moment() > moment(GetToken().expires_at));
	}
	throw Error("No token data");
}