import { doc, getDoc } from "firebase/firestore";
import { db } from "../App";
import IUser from "./IUser";

export default async function getUser(userId:string):Promise<IUser | null> {

  const docRef = doc(db, "/users/", userId);
  let user;
  const docSnap = await getDoc(docRef)

  const data = docSnap.exists() ? docSnap.data() as IUser : null

  if (data === null || data === undefined) {
    return null
  } 

  return data
}