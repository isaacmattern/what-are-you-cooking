import { StringMappingType } from "typescript";

export default interface IRecipe {
  title: string,
  description: string,
  authorID: string,
  authorName: string,
  ingredients: string[],
  directions: string[],
};