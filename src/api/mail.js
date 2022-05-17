const express = require("express");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { GetMailToken } = require("../../func/get_mail-token");
const {
  createinternationalShipment,
  US_DomesticRateShop,
  validate,
  US_DomesticReturnLabel,
  GetInternationalRatesQuotes,
} = require("../../func/fedEX_Input");

const router = express.Router();

router.post(
  "/request_rate/international_return_rate_quotes",
  GetMailToken,
  (req, res) => {
    try {
      var body = req.body;
      const token = JSON.parse(req.token_res);
      const access_token = token.access_token;

      //console.log("TOKEN ===>", token);

      const input = GetInternationalRatesQuotes(body);

      const data = JSON.stringify(input);

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          try {
            //console.log(this.responseText);
            res.status(200).json(JSON.parse(this.responseText));
          } catch (e) {
            res.status(400).json({ error: this });
          }
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
);

router.post("/request_rate/US-domestic-rate-shop", GetMailToken, (req, res) => {
  try {
    var body = req.body;
    var returnNow = false;
    const dataToBeResponded = [{}, {}];
    const token = JSON.parse(req.token_res);
    const access_token = token.access_token;

    //console.log("TOKEN ===>", token);

    const input2 = US_DomesticRateShop(body, "FEDEX_EXPRESS_SAVER");
    const input1 = US_DomesticRateShop(body, "FEDEX_GROUND");
    const metaData = [JSON.stringify(input1), JSON.stringify(input2)];

    metaData.map((data, i) => {
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          try {
            //console.log(this.responseText);

            if (typeof JSON.parse(this.responseText) === "object") {
              dataToBeResponded[i] = JSON.parse(this.responseText);
            }
          } catch (e) {
            //console.log("there is an error");
            dataToBeResponded[i] = { error: e };
          } finally {
            if (returnNow === true) {
              res.status(200).json(dataToBeResponded);
            }
            returnNow = true;
          }
        }
      });

      xhr.open("POST", "https://apis-sandbox.fedex.com/rate/v1/rates/quotes");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("X-locale", "en_US");
      xhr.setRequestHeader("Authorization", `Bearer ${access_token}`);
      xhr.send(data);
    });
  } catch (e) {
    console.log("ERROR trying to call request_rate === ", e);
    //res.status(400).json({ error: e });
  }
});

router.post(
  "/create_shipment/US_domestic_return_label",
  GetMailToken,
  (req, res) => {
    try {
      const body = req.body;
      const token = JSON.parse(req.token_res);
      const access_token = token.access_token;

      const input = US_DomesticReturnLabel(body);
      const data = JSON.stringify(input);

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          try {
            res.status(200).json(JSON.parse(this.responseText));
          } catch (e) {
            res.status(400).json({ error: e, status: this });
          }
        }
      });

      xhr.open("POST", "https://apis-sandbox.fedex.com/ship/v1/shipments");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("X-locale", "en_US");
      xhr.setRequestHeader("Authorization", `Bearer ${access_token}`);
      xhr.send(data);
    } catch (e) {
      console.log("ERROR trying to call request_rate === ", e);
    }
  }
);

router.post("/validate_shipment", GetMailToken, (req, res) => {
  try {
    var body = "req.body";
    const token = JSON.parse(req.token_res);
    const access_token = token.access_token;

    //console.log("TOKEN ===>", token.token_type);

    const input = validate(body);

    const data = JSON.stringify(input);

    console.log("data ===>", data);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        try {
          res.status(200).json(JSON.parse(this.responseText));
        } catch (e) {
          res.status(400).json({ error: e, status: this.status });
        }
      }
    });

    xhr.open(
      "POST",
      "https://apis-sandbox.fedex.com/ship/v1/shipments/packages/validate"
    );
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-locale", "en_US");
    xhr.setRequestHeader("Authorization", `Bearer ${access_token}`);
    xhr.send(data);
  } catch (e) {
    console.log("ERROR trying to call request_rate === ", e);
  }
});

// {
//   "trackingInfo": [
//   {
//   "trackingNumberInfo": {
//   "trackingNumber": "794843185271"
//   }
//   }
//   ],
//   "includeDetailedScans": true
//   }

router.post("/track", GetMailToken, (req, res) => {
  const body = req.body;

  const token = JSON.parse(req.token_res);
  const access_token = token.access_token;

  // 'input' refers to JSON Payload
  var data = JSON.stringify(body);

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      try {
        res.status(200).json(JSON.parse(this.responseText));
      } catch (e) {
        res.status(400).json({ error: e, status: this.status });
      }
    }
  });

  xhr.open("POST", "https://apis-sandbox.fedex.com/track/v1/trackingnumbers");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("X-locale", "en_US");
  xhr.setRequestHeader("Authorization", `Bearer ${access_token}`);

  xhr.send(data);
});

module.exports = router;
