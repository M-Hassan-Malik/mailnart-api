const express = require("express");
const router = express.Router();
const { userRef } = require("../db/ref");

router.post("/save_order", (req, res) => {
  const body = req.body;
  userRef
    .doc(body.uid)
    .collection("orders")
    .doc(body.transactionId)
    .set({
      ...body.order,
      status: 'pending'
    })
    .then((doc) => {
      doc.writeTime // if exists -> show error
        ? res.status(200).json({ result: doc })
        : res.status(400).json({ error: doc });
    });
});

router.post("/get_orders", (req, res) => {
  const query = req.body;
  userRef
    .doc(query.uid)
    .collection("orders")
    .get()
    .then((querySnapshot) => {
      let orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({
          id: doc.id,
          ...doc.data()
        })
      })

      res.status(200).json({ result: orders })

    }).catch((err) => {
      res.status(400).json({
        status: false,
        error: err
      })
    })
});

module.exports = router;
