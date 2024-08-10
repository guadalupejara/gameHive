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

export { addQuiz, updateQuiz, addTester, getQuizByIdProperty, updateTestTakerArr, listenToTestTakers, getTesterArrByQuiz };
