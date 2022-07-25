import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../App"
import IRecipe from "./IRecipe";

export default async function getRecipeById(recipeId:string):Promise<IRecipe | false> {

  const docRef = doc(db, "/recipes/", recipeId); 
  const docSnap = await getDoc(docRef)

  const data = docSnap.exists() ? docSnap.data() as IRecipe : false

  return data
}