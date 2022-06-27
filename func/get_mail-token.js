const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var production = "https://apis.fedex.com";
var dev = "https://apis-sandbox.fedex.com";


var dev = "https://apis-sandbox.fedex.com";
var production = "https://apis.fedex.com"

module.exports = {
  GetMailToken(req, res, next) {    
    try {
    var data = `grant_type=client_credentials&client_id=${process.env.FEDEX_API_KEY}&client_secret=${process.env.FEDEX_SECRET_KEY}`;

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          //req.token_res = JSON.parse(this.responseText);
          req.token_res = this.responseText;
          next();
        }
      });

      xhr.open("POST", `${dev}/oauth/token`);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(data);
    } catch (e) {
      console.log("ERROR trying to call OAuth/Token === ", e);
    }
  },
};