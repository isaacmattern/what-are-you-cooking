import { StringMappingType } from "typescript";

export default interface IRecipe {
  title: string,
  description: string,
  authorID: string,
  authorUsername: string,
  authorName: string,
  tags: string[],
  ingredients: string[],
  directions: string[],
  recipeId: string,
};