import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../App"
import IRecipe from "./IRecipe";

export default async function getUserRecipesByUserId(userId:string):Promise<IRecipe[]> {

  var results: IRecipe[] = [];

  const q = query(collection(db, "recipes"), where("authorID", "==", userId));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    results.push(doc.data() as IRecipe)
  });

  return results;

}