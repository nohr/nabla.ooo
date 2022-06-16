const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


// exports.generateLOT = functions.storage.object().onFinalize(async (object) => {
//     const LOTBucket = object.bucket;
//     const contentType = object.contentType;
//     const LOTPath = object.name;
//     console.log(LOTBucket, LOTPath, contentType);
// })