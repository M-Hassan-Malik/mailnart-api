const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const { userRef } = require("../db/ref");

router.post(
  "/register",
  (req, res, next) => {
    const body = req.body;
    // Check User

    admin
      .auth()
      .getUserByEmail(body.email)
      .then((user) => {
        res.status(400).json({ result: "already registered" });
      })
      .catch((err) =>
        err.code === "auth/user-not-found"
          ? next()
          : res.status(404).json({ err: err })
      );

    //     userRef
    //       .doc(body.uid)
    //       .collection("info")
    //       .doc("details")
    //       .get()
    //       .then((doc) => {
    //         if (doc.exists) {
    //           res.json({
    //             status: false,
    //             error: "User Already Exists With This Email !",
    //           });
    //         } else {
    //           next();
    //         }
    //       })
    //       .catch((err) => {
    //         res.json({
    //           status: false,
    //           error: err,
    //         });
    //       });
  },
  // Register User
  async (req, res) => {
    const body = req.body;

      const userRecord = await admin.auth().createUser({
        email: body.email,
        emailVerified: false,
        password: body.password,
        displayName: body.fullName,
        disabled: false,
      }).then(()=>{
        const batch = admin.firestore().batch();
        batch.set(userRef.doc(userRecord.uid).collection("info").doc("details"), {
          accountInfo: {
            id: userRecord.uid,
            fullName: body.fullName,
            email: body.email,
            emailVerified: false,
            password: body.password,
            created: admin.firestore.FieldValue.serverTimestamp(),
            disabled: false,
            googleAuthenticated: false,
            channelSubscribed: false,
            type: "user",
          },
        });
        batch.set(userRef.doc(userRecord.uid), {
          uid: userRecord.uid,
        });
        batch.commit().then(()=>{
          res.status(200).json({
            result: "ok",
          });
        }).catch((err)=>{
          res.json({
            status:false,
            error:err
          })
        })
       
        }).catch((err)=>{
          res.json({
            status:false,
            error:err
          })
        })
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully created new user.uid:", userRecord.uid);
  }
);

module.exports = router;
