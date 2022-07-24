import { collection, query, where, getDocs } from "firebase/firestore";import { db } from "../App";
import IUser from "./IUser";

export default async function getUserEntryByUsername(username:string):Promise<IUser | false> {

  let res;

  const q = query(collection(db, "users"), where("username", "==", username));
  
  const querySnapshot = await getDocs(q);
  if(querySnapshot.docs[0] === undefined) {
    return false;
  }
  return querySnapshot.docs[0].data() as IUser

}