import { doc, getDoc } from "firebase/firestore";
import { db } from "../App";
import IUser from "./IUser";

export default async function getUser(userId:string):Promise<IUser> {

  const docRef = doc(db, "/users/", userId); 
  const docSnap = await getDoc(docRef)

  const data = docSnap.exists() ? docSnap.data().userInfo as IUser : { emailAddress: "XXX", fullName: "XXX", userId:"XXX", username:"XXX", posts:[] }

  return data
}