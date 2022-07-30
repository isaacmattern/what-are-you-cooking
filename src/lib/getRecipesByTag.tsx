import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../App"
import IRecipe from "./IRecipe";

export default async function getRecipesByTag(tag:string):Promise<IRecipe[]> {

  var results: IRecipe[] = [];

  const q = query(collection(db, "recipes"), where("tags", "array-contains", tag));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    results.push(doc.data() as IRecipe)
  });

  return results;

}