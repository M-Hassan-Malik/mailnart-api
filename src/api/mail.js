const { default: axios } = require("axios");

const express = require("express");

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const { GetRatesInput, GetMailToken } = require("../../func/mail");

const router = express.Router();

router.post("/request_rate", GetMailToken, async (req, res, next) => {
  try {
    const token = req.token_res.access_token;

    // console.log("TOKEN === ", token);

    const input = GetRatesInput();

    const data = JSON.stringify(input);
    console.log(JSON.stringify(input, null, 3));

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.defaults.withCredentials = true;
    axios.post('https://apis-sandbox.fedex.com/rate/v1/rates/quotes', {
      headers: {
        "Content-type": "application/json",
      },
      addEventListener:
        ("readystatechange",
        function () {
          if (this.readyState === 4) {
            res.json(this.responseText);
          }
        }),
    });

    // var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;

    // xhr.addEventListener("readystatechange", function () {
    //   if (this.readyState === 4) {
    //     res.json(this.responseText);
    //   }
    // });

    // xhr.open("POST", "https://apis-sandbox.fedex.com/rate/v1/rates/quotes");
    // xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.setRequestHeader("X-locale", "en_US");
    // xhr.setRequestHeader("Authorization", `Bearer ${token}`);

    // xhr.send(data)
  } catch (e) {
    console.log("ERROR trying to call request_rate === ", e);
  }
});

module.exports = router;
