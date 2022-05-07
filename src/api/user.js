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
      transactionIdFromRates:body.transactionId,
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

router.post("/edit_orders", (req, res) => {
  const query = req.body;


  console.log('body -> ',query)

  userRef.doc(query.uid).collection("orders").doc(query.transactionId).update({
      shippingLabel: params.shippingLabel
  }).then(()=>{
    res.status(200).json({
      status: true,
      message: 'success'
    }) 
  }).catch((err) => {
    res.status(400).json({
      status: false,
      error: err
    })
  })
 
});

router.post("/remove_order", (req, res) => {
  const body = req.body;

  console.log('body -> ',body);
  userRef
    .doc(body.uid)
    .collection("orders")
    .doc(body.transactionId)
    .delete()
    .then(() => {
      res.status(200).json({ result: 'success' })
    }).catch((err)=>{
      res.status(400).json({ result: 'error',error: err })
    }).catch((err)=>{
      res.status(400).json({ result: 'error',error: err })
    })
});

module.exports = router;