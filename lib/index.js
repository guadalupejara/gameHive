/* eslint-disable no-undef */

import { firestoreDb } from '../firebaseConfig';
import { doc, addDoc, getDoc, setDoc, collection, updateDoc, query, where, getDocs, arrayUnion } from "firebase/firestore";

//testMaker Functions

const getQuizByIdProperty = async (quizId) => {
  try {
    console.log("touched function")
    const quizCollectionRef = collection(firestoreDb, 'Quiz');
    const quizQuery = query(quizCollectionRef, where('id', '==', quizId));
    const querySnapshot = await getDocs(quizQuery);

    if (!querySnapshot.empty) {
      const quizData = querySnapshot.docs[0].data(); 
      return quizData;
    } else {
      console.log('No quiz found with the provided ID!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching quiz:', error);
    throw error;
  }
};

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

// testTaker Functions
const addTester = async (tester) => {
  try {
    const document = collection(firestoreDb, 'current_user_testTaker');
    const insertTester = await addDoc(document, tester);
    console.log('testerArr doc id:', insertTester.id); 
    return insertTester.id;
  } catch (error) {
    console.error("Error uploading data:", error);
    throw error; 
  }
};

const updateTestTakerArr = async (quizId, newTester) => {
  try {
    // Reference to the document in the 'testTakerArr' collection using the quizId
    const testerDocRef = doc(firestoreDb, 'testTakerArr', quizId);

    // Fetch the document snapshot
    const testerDocSnapshot = await getDoc(testerDocRef);

    if (testerDocSnapshot.exists()) {
      // If the document exists, update the testers array by adding the new tester
      await updateDoc(testerDocRef, {
        testers: arrayUnion(newTester),
      });
      console.log('Tester added to existing array.');
    } else {
      // If the document does not exist, create a new document with the testers array
      await setDoc(testerDocRef, {
        id: quizId, // quizId will be used as the document ID
        testers: [newTester],
      });
      console.log('New tester document created.');
    }
  } catch (error) {
    console.error('Error updating testTaker array:', error);
    throw error;
  }
};

export { addQuiz, updateQuiz, addTester, getQuizByIdProperty, updateTestTakerArr };
