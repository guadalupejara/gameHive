/* eslint-disable no-undef */

import { firestoreDb } from '../firebaseConfig';
import { doc, setDoc, addDoc, collection, updateDoc } from "firebase/firestore";

//testMaker Functions
const addQuiz = async (quiz) => {
  try {
    const document = collection(firestoreDb, 'Quiz');
    const insertQuiz = await addDoc(document, quiz);
    console.log('quiz doc id:', insertQuiz.id); 
    return insertQuiz.id;
  } catch (error) {
    console.error("Error uploading data:", error);
    throw error; 
  }
};

const updateQuiz = async (docId, updatedQuizData) => {
  try {
    const quizDocRef = doc(firestoreDb, 'Quiz', docId); 
    await updateDoc(quizDocRef, updatedQuizData); 
    console.log('Quiz updated successfully');
  } catch (error) {
    console.error("Error updating quiz:", error);
    throw error; 
  }
};

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

export { uploadData, addQuiz, updateQuiz };
