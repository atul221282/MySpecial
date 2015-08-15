var ipAddress = "192.168.0.5";
//ipAddress = "172.17.69.92";
var baseUrl = "http://" + ipAddress + "/MySpecial.Authorisation.API/api/";
var resourceUrl = "http://" + ipAddress + "/MySpecial.Resource.API/api/";

module.exports = {
	apiUrl: "http://" + ipAddress + "/MySpecial.Resource.API/api/",
	authUrl: "http://" + ipAddress + "/MySpecial.Authorisation.API/api/",
	authToken: ""
};