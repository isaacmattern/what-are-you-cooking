import { doc, getDoc } from "firebase/firestore";
import { db } from "../App";
import IUser from "./IUser";

export default async function getUser(userId:string):Promise<IUser> {

  console.log(userId)

  const docRef = doc(db, "/users/", userId);
  const docSnap = await getDoc(docRef)

  let data1 = docSnap.data()
  if(data1 !== undefined) {
    console.log(data1.userInfo)
  }

  const data = docSnap.exists() ? docSnap.data().userInfo as IUser : { emailAddress: "XXX", fullName: "XXX", userId:"XXX", username:"XXX" }

  console.log(data)

  return data
}