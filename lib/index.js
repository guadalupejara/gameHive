/* eslint-disable no-undef */

import { firestoreDb } from '../firebaseConfig';
import { doc, addDoc, getDoc, setDoc, collection, updateDoc, query, where, getDocs, arrayUnion, onSnapshot } from "firebase/firestore";

//testMaker Functions

const getQuizByIdProperty = async (quizId) => {
  try {
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

const addQuizCode = async (quizCode) => {
  try {
    const docRef = doc(firestoreDb, 'list_of_quizCodes', 'zSdranmPcU9PuabCe3so');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      
     const document = await updateDoc(docRef, {
        quizCodes: arrayUnion(quizCode) 
      });

      console.log('Quiz code document:', document);
    } else {
      console.log('No such document!');
    }
  }
 catch (error) {
    console.error("Error uploading data:", error);
    throw error; 
  }
};

const getQuizCodes = async () => {
  try {

    const docRef = doc(firestoreDb, 'list_of_quizCodes', 'zSdranmPcU9PuabCe3so');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const quizCodes = data?.quizCodes || []; 
      return quizCodes;
    } else {
      console.log('No such document!');
      return []; 
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    throw error;
  }
};

const addToggleGame = async (toggle) => {
  try {
   
    const docRef = doc(firestoreDb, 'is_Quiz_Active', toggle.gameId);
    await setDoc(docRef, toggle, { merge: true });

    console.log('Toggle game document created or updated with ID:', toggle.gameId);
    return toggle.gameId;
  } catch (error) {
    console.error('Error uploading data:', error);
    throw error;
  }
};
const updateToggleGame = async (docId, updatedToggleData) => {
  try {
    const quizDocRef = doc(firestoreDb, 'is_Quiz_Active', docId); 
    await updateDoc(quizDocRef, updatedToggleData); 
    console.log('Toggle updated successfully');
  } catch (error) {
    console.error("Error updating toggle:", error);
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
    
    const testerDocRef = doc(firestoreDb, 'testTakerArr', quizId);
    const testerDocSnapshot = await getDoc(testerDocRef);

    if (testerDocSnapshot.exists()) {
      await updateDoc(testerDocRef, {
        testers: arrayUnion(newTester),
      });
      console.log('Tester added to existing array.');
    } else {
      await setDoc(testerDocRef, {
        id: quizId, 
        testers: [newTester],
      });
      console.log('New tester document created.');
    }
  } catch (error) {
    console.error('Error updating testTaker array:', error);
    throw error;
  }
};

const getTesterArrByQuiz = async (quizId) => {
  try {
    const arrCollectionRef = collection(firestoreDb, 'testTakerArr');
    const arrQuery = query(arrCollectionRef, where('id', '==', quizId));
    const querySnapshot = await getDocs(arrQuery);

    if (!querySnapshot.empty) {
      const arrData = querySnapshot.docs[0].data(); 
      return arrData;
    } else {
      console.log('No array found with the provided ID!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching testers:', error);
    throw error;
  }
};

const listenToTestTakers = (quizId, callback) => {
  const arrCollectionRef = collection(firestoreDb, 'testTakerArr');
  const arrQuery = query(arrCollectionRef, where('id', '==', quizId));

  const unsubscribe = onSnapshot(arrQuery, (querySnapshot) => {
    if (!querySnapshot.empty) {
      const arrData = querySnapshot.docs[0].data();
      callback(arrData.testers); 
    } else {
      callback([]);
    }
  });

  return unsubscribe; 
};

export { addQuiz, updateQuiz, addTester, getQuizByIdProperty, updateTestTakerArr, listenToTestTakers, getTesterArrByQuiz, addQuizCode, getQuizCodes, addToggleGame, updateToggleGame };
