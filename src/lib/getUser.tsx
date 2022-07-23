import { doc, getDoc } from "firebase/firestore";
import { db } from "../App";
import IUser from "./IUser";

export default async function getUser(userId:string):Promise<IUser> {

  console.log(userId)

  const docRef = doc(db, "/users/", userId);
  const docSnap = await getDoc(docRef)

  console.log(docSnap)

  const data = docSnap.exists() ? docSnap.data() as IUser : { emailAddress: "XXX", fullName: "XXX", userId:"XXX", username:"XXX" }

  return data
}