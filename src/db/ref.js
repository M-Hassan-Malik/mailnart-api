const admin = require("firebase-admin");
const db = admin.firestore();

// Authentication
const userRef = db.collection("users");


module.exports = {
    userRef
};
