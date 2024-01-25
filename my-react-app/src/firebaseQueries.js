import { db } from "./firebase.config";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";


/**
 * Adds a document to a top-level collection in the Firestore database.
 * @param {string} coll - The name of the collection.
 * @param {string} collId - The ID of the document to be added.
 * @param {object} data - The data to be added to the document.
 */
export const addDocumentToCollection = async (coll, collId, data) => {
  const docRef = doc(db, coll, collId);
  await setDoc(docRef, data);
};


/**
 * Adds a document to a subcollection within a top-level collection in the Firestore database.
 * @param {string} coll - The name of the top-level collection.
 * @param {string} collId - The ID of the top-level document.
 * @param {string} subcoll - The name of the subcollection.
 * @param {string} subcollId - The ID of the document to be added to the subcollection.
 * @param {object} data - The data to be added to the document.
 */
export const addDocumentToSubcollection = async (
  coll,
  collId,
  subcoll,
  subcollId,
  data
) => {
  const docRef = doc(db, coll, collId);
  const subcollRef = collection(docRef, subcoll);
  const subcollDocRef = doc(subcollRef, subcollId);
  await setDoc(subcollDocRef, data);
};


/**
 * Retrieves all documents from a top-level collection in the Firestore database.
 * @param {string} coll - The name of the collection.
 * @returns {Array} - An array of documents from the collection.
 */
export const getAllDocumentsFromCollection = async (coll) => {
  const querySnapshot = await getDocs(collection(db, coll));
  const data = querySnapshot.docs.map((doc) => doc.data());
  return data;
};


/**
 * Retrieves all documents from a top-level collection in the Firestore database,
 * along with their respective document IDs.
 * @param {string} coll - The name of the collection.
 * @returns {Array} - An array of objects containing document UID and data.
 */
export const getAllDocumentsFromCollectionWithUID = async (coll) => {
  const querySnapshot = await getDocs(collection(db, coll));
  const data = querySnapshot.docs.map((doc) => ({
    uid: doc.id,
    data: doc.data()
  }));
  return data;
};


/**
 * Retrieves a specific document from a top-level collection in the Firestore database.
 * @param {string} coll - The name of the collection.
 * @param {string} collId - The ID of the document to be retrieved.
 * @returns {object} - The data of the specified document.
 */
export const getSpecificDocumentFromCollection = async (coll, collId) => {
  const documentRef = await getDoc(doc(db, coll, collId));
  return documentRef.data();
};


/**
 * Retrieves all documents from a subcollection within a top-level collection in the Firestore database.
 * @param {string} coll - The name of the top-level collection.
 * @param {string} collId - The ID of the top-level document.
 * @param {string} subcoll - The name of the subcollection.
 * @returns {Array} - An array of documents from the subcollection.
 */
export const getAllDocumentsFromSubcollection = async (
  coll,
  collId,
  subcoll
) => {
  const subcollectionRef = collection(db, coll, collId, subcoll);
  const snapshot = await getDocs(subcollectionRef);
  const subcollectionData = snapshot.docs.map((doc) => doc.data());
  return subcollectionData;
};


/**
 * Retrieves a specific document from a subcollection within a top-level collection in the Firestore database.
 * @param {string} coll - The name of the top-level collection.
 * @param {string} collId - The ID of the top-level document.
 * @param {string} subcoll - The name of the subcollection.
 * @param {string} subcollId - The ID of the document to be retrieved.
 * @returns {object} - The data of the specified document.
 */
export const getSpecificDocumentFromSubcollection = async (
  coll,
  collId,
  subcoll,
  subcollId
) => {
  const subcollectionRef = collection(db, coll, collId, subcoll);
  const specificDocRef = doc(subcollectionRef, subcollId);
  const specificDoc = await getDoc(specificDocRef);
  return specificDoc.data();
};


/**
 * Updates a specific document in a top-level collection in the Firestore database.
 * @param {string} coll - The name of the collection.
 * @param {string} collId - The ID of the document to be updated.
 * @param {object} data - The data to be updated in the document.
 */
export const updateSpecificDocumentInCollection = async (
  coll,
  collId,
  data
) => {
  const documentRef = doc(db, coll, collId);
  await updateDoc(documentRef, data);
};


/**
 * Updates a specific document in a subcollection within a top-level collection in the Firestore database.
 * @param {string} coll - The name of the top-level collection.
 * @param {string} collId - The ID of the top-level document.
 * @param {string} subcoll - The name of the subcollection.
 * @param {string} subcollId - The ID of the document to be updated.
 * @param {object} data - The data to be updated in the document.
 */
export const updateDocumentInSubcollection = async (
  coll,
  collId,
  subcoll,
  subcollId,
  data
) => {
  const subcollectionRef = collection(db, coll, collId, subcoll);
  const subDocRef = doc(subcollectionRef, subcollId);
  await updateDoc(subDocRef, data);
};


/**
 * Deletes a specific document from a top-level collection in the Firestore database.
 * @param {string} coll - The name of the collection.
 * @param {string} collId - The ID of the document to be deleted.
 */
export const deleteSpecificDocumentFromCollection = async (coll, collId) => {
  await deleteDoc(doc(db, coll, collId));
};


/**
 * Deletes a specific document from a subcollection within a top-level collection in the Firestore database.
 * @param {string} coll - The name of the top-level collection.
 * @param {string} collId - The ID of the top-level document.
 * @param {string} subcoll - The name of the subcollection.
 * @param {string} subcollId - The ID of the document to be deleted.
 */
export const deleteSpecificDocumentFromSubcollection = async (
  coll,
  collId,
  subcoll,
  subcollId
) => {
  const subcollectionRef = collection(db, coll, collId, subcoll);
  const documentRef = doc(subcollectionRef, subcollId);
  await deleteDoc(documentRef);
};