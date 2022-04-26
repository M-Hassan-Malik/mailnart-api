const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = {
  GetMailToken(req, res, next) {
    // var data = `grant_type=client_credentials&client_id=${process.env.FEDEX_API_KEY}&client_secret=${process.env.FEDEX_SECRET_KEY}`;
    var FEDEX_API_KEY = "l73ef5165d92194507a9845ac76eacd13f";
    var FEDEX_SECRET_KEY = "1ef3b41d37ef44869b68590047f4bb35";
    var data = `grant_type=client_credentials&client_id=${FEDEX_API_KEY}&client_secret=${FEDEX_SECRET_KEY}`;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        //req.token_res = JSON.parse(this.responseText);
        req.token_res = this.responseText;
        next();
      }
    });

    xhr.open("POST", "https://apis-sandbox.fedex.com/oauth/token");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
  },

  GetRatesInput(FEDEX_ACCOUNT_NUMBER,data) {
    return {
      accountNumber: {
        value: FEDEX_ACCOUNT_NUMBER,
      },
      requestedShipment: {
        shipper: data.shipper,
        recipient: data.recipient,
        pickupType: data.pickupType,
        serviceType: data.serviceType,
        rateRequestType: ["LIST"],
        shipDateStamp: data.shipDateStamp,
        requestedPackageLineItems: [
          {
            weight: {
              units: "LB",
              value: data.weught_value,
            },
            dimensions: {
              length: data.length,
              width: data.width,
              height: data.height,
              units: "IN",
            },
          },
        ],
      },
    };
  },
};
