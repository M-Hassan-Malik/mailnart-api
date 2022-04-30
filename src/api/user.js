const express = require("express");
const router = express.Router();
const { userRef } = require("../db/ref");

router.post("/save_order", (req, res) => {
  const body = req.body;
  userRef
    .doc(body.uid)
    .collection("orders")
    .doc(body.transactionId)
    .set(body.order)
    .then((doc) => {
      doc.writeTime // if exists -> show error
        ? res.status(200).json({ result: doc })
        : res.status(400).json({ error: doc });
    });
});

router.get("/get_orders", (req, res) => {
  const query = req.query;
  userRef
    .doc(query.uid)
    .collection("orders")
    .doc(query.transactionId)
    .get()
    .then((doc) => {
      doc.exists // if exists -> show error
        ? res.status(200).json({ result: doc.data() })
        : res.status(400).json({ error: "Order not found" });
    });
});

module.exports = router;