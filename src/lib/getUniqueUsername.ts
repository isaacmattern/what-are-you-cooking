import { getAuth } from "firebase/auth";
import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  setDoc
} from "firebase/firestore"

import { db } from "../App"


export default async function getUniqueUsername(name:string):Promise<string> {
  let username = name
  // Remove whitespace
  username = username.replace(/\s/g, "");
  username = username.toLowerCase();

  const docRef = doc(db, "/usernames/", username);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    console.log("Username already taken!!");

    const originalUsername = username
    let unique = false
    let i = 1
    while(!unique) {
      username = originalUsername + i
      const docRef = doc(db, "/usernames/", username);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        unique = true
      }
      i = i + 1
    }
  }

  setDoc(doc(db, "usernames", username), {})
    .then(() => console.log("New Username Added."))
    .catch(err => console.error(err))

  return username;
}