const express = require('express');

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const { GetRatesInput, GetMailToken } = require("../../func/mail")

const router = express.Router();

router.post(
  "/request_rate",
  GetMailToken,
  async (req, res, next) => {
    try {
      var body = req.body;
      var FEDEX_ACCOUNT_NUMBER = "510087380";
      const token = JSON.parse(req.token_res);
      const access_token = token.access_token;

       //console.log("TOKEN ===>", token);

      const input = GetRatesInput(FEDEX_ACCOUNT_NUMBER,body);

      const data = JSON.stringify(input);
  
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          //console.log(this.responseText)
          res.json(JSON.parse(this.responseText));
        }
      });
      
      xhr.open("POST", "https://apis-sandbox.fedex.com/rate/v1/rates/quotes");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("X-locale", "en_US");
      xhr.setRequestHeader("Authorization", `Bearer ${access_token}`);
      
      xhr.send(data);
    } catch (e) {
      console.log("ERROR trying to call request_rate === ", e);
    }
  }
)

module.exports = router;