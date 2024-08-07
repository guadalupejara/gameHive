/* eslint-disable no-undef */

// index.js
import { firestoreDb } from '../firebaseConfig';
import { doc, setDoc } from "firebase/firestore";

const uploadData = async () => {
  const dataToUpload = {
    name: 'newTester',
    role: 'testMaker'
  };

  try {
    const document = doc(firestoreDb, 'current_user_testMaker', 'user');
    let dataUpdated = await setDoc(document, dataToUpload);
    return dataUpdated;
  } catch (error) {
    console.error("Error uploading data:", error);
  }
};

export { uploadData };
