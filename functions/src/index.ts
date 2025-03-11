
//example of file for cloud function- however, only deployable w/ firestore Blaze plan
// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";

// // Initialize Firebase Admin SDK
// admin.initializeApp();
// const firestoreDb = admin.firestore();

// // Cloud Function to upload data
// export const uploadData = functions.https.onRequest(async (req, res) => {
//   const dataToUpload = {
//     name: "newTester",
//     role: "testMaker",
//   };

//   try {
//     const document = firestoreDb.doc("current_user_testMaker/user");
//     await document.set(dataToUpload);
//     res.status(200).send("Data uploaded successfully");
//   } catch (error) {
//     console.error("Error uploading data:", error);
//     res.status(500).send("Error uploading data");
//   }
// });
