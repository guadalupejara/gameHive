/* eslint-disable no-undef */

import { firestoreDb } from '../firebaseConfig';
import { doc, setDoc, addDoc, collection } from "firebase/firestore";

//testMaker Functions

const addQuiz = async (quiz) =>{
  try{
    const document = collection(firestoreDb, 'Quiz')
    let insertQuiz = await addDoc(document,quiz)
    return insertQuiz

  }
  catch(error){console.error("Error uploading data:", error);}
}

const uploadData = async () => {
  const dataToUpload = {
    name: 'Tester: Final',
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

export { uploadData, addQuiz };
