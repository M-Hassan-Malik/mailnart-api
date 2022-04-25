const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = {
  GetMailToken(req, res, next) {
    var data = `grant_type=client_credentials&client_id=${process.env.FEDEX_API_KEY}&client_secret=${process.env.FEDEX_SECRET_KEY}`;
      
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        req.token_res = JSON.parse(this.responseText);
        next();
      }
    });

    xhr.open("POST", "https://apis-sandbox.fedex.com/oauth/token");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
  },

  GetRatesInput() {
    return {
      "accountNumber": {
        "value": process.env.FEDEX_ACCOUNT_NUMBER
      },
      "requestedShipment": {
        "shipper": {
        "address": {
        "postalCode": 65247,
        "countryCode": "US"
        }
        },
        "recipient": {
        "address": {
        "postalCode": 75063,
        "countryCode": "US"
        }
        },
        "pickupType": "DROPOFF_AT_FEDEX_LOCATION",
        "serviceType": "FEDEX_1_DAY_FREIGHT",
        "rateRequestType": [
          "LIST",
          "ACCOUNT"
        ],
        "requestedPackageLineItems": [
          {
            "weight": {
              "units": "LB",
              "value": 151
            },
            "dimensions": {
              "length": 30,
              "width": 30,
              "height": 40,
              "units": "IN"
            }
          }
        ]
      }
    }
  }
}