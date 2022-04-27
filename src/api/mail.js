const express = require("express");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { GetMailToken } = require("../../func/mail");
const { createShipment } = require("../../func/fedEX_Input");

const router = express.Router();

router.post("/request_rate", GetMailToken, (req, res) => {
  try {
    var body = req.body;
    const token = JSON.parse(req.token_res);
    const access_token = token.access_token;

    //console.log("TOKEN ===>", token);

    const input = GetRatesInput(body);

    const data = JSON.stringify(input);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        try {
          //console.log(this.responseText)
          res.json(JSON.parse(this.responseText));
          // const jsonResponse = JSON.parse(this.responseText);

          // res.json({
          //   transactionId: jsonResponse.transactionId,
          //   rateType:
          //     jsonResponse.output.rateReplyDetails[0].ratedShipmentDetails[0]
          //       .rateType,
          //   totalBaseCharge:
          //     jsonResponse.output.rateReplyDetails[0].ratedShipmentDetails[0]
          //       .totalBaseCharge,
          //   totalNetCharge:
          //     jsonResponse.output.rateReplyDetails[0].ratedShipmentDetails[0]
          //       .totalNetCharge,
          //   totalNetFedExCharge:
          //     jsonResponse.output.rateReplyDetails[0].ratedShipmentDetails[0]
          //       .totalNetFedExCharge,
          //   totalNetFedExCharge:
          //     jsonResponse.output.rateReplyDetails[0].ratedShipmentDetails[0]
          //       .totalNetFedExCharge,
          //   mailnArt_Fee:
          //     (10 / 100) *
          //     jsonResponse.output.rateReplyDetails[0].ratedShipmentDetails[0]
          //       .totalNetFedExCharge,
          //       delivery: {
          //     date: jsonResponse.output.rateReplyDetails[0].operationalDetail
          //       .deliveryDate,
          //     day: jsonResponse.output.rateReplyDetails[0].operationalDetail
          //     .deliveryDay,
          //   },
          //   commits: {
          //     commit:  jsonResponse.output.rateReplyDetails[0].commit.dateDetail,
          //     date: jsonResponse.output.rateReplyDetails[0].operationalDetail
          //       .commitDate,
          //     day: jsonResponse.output.rateReplyDetails[0].operationalDetail
          //     .commitDays,
          //   },
          // });
        } catch (e) {
          res.status(400).json({ error: e });
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
});

router.post("/create_shipment", GetMailToken, (req, res) => {
  try {
    var body = req.body;
    const token = JSON.parse(req.token_res);
    const access_token = token.access_token;

    //console.log("TOKEN ===>", token);

    const input = createShipment(body);

    const data = JSON.stringify(input);

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

    xhr.open("POST", "https://apis-sandbox.fedex.com/ship/v1/shipments");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-locale", "en_US");
    xhr.setRequestHeader("Authorization", `Bearer ${access_token}`);
    xhr.send(data);
  } catch (e) {
    console.log("ERROR trying to call request_rate === ", e);
  }
});

module.exports = router;
