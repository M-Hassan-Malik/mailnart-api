const express = require("express");
const router = express.Router();
const { userRef } = require("../db/ref");
const admin = require("firebase-admin");
const db = admin.firestore();


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


  console.log('body -> ',{
    uid: query.uid,
    transactionId: query.transactionId
  })


  try {
    const batch = db.batch();

    // Edit Order
    const ordersRef = userRef.doc(query.uid).collection("orders").doc(query.transactionId)
    batch.update(ordersRef, { shippingLabel: query.shippingLabel, status: "labeled" }); 

    // Commit the batch
    batch.commit().then(() => {
      res.json({
        status:true,
        message: "Order Edit Successfull"
      })
    }).catch((err)=>{
      res.json({
        status:false,
        error:err
      })
    })
  } catch (error) {
    res.json({
      status:false,
      error:error
    })
  }



  // userRef.doc(query.uid).collection("orders").doc(query.transactionId).update({
  //     shippingLabel: params.shippingLabel
  // }).then((doc)=>{
  //   res.status(200).json({
  //     status: true,
  //     message: 'success'
  //   }) 
  // }).catch((err) => {
  //   res.status(400).json({
  //     status: false,
  //     error: err
  //   })
  // })
 
});

router.post("/remove_order", (req, res) => {
  const body = req.body;
  console.log('body -> ',body);
  

  try {
    const batch = db.batch();

    // Edit Order
    const ordersRef = userRef.doc(body.uid).collection("orders").doc(body.transactionid)
    batch.delete(ordersRef);

    // Commit the batch
    batch.commit().then(() => {
      res.json({
        status:true,
        message: "Order Remove Successfull"
      })
    }).catch((err)=>{
      res.json({
        status:false,
        error:err
      })
    })
  } catch (error) {
    res.json({
      status:false,
      error:error
    })
  }
});

module.exports = router;