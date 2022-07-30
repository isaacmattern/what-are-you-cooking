import { collection } from 'firebase/firestore';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../App';
import RecipeCardContainer from '../components/RecipeCardContainer';
import getRecipesByTag from '../lib/getRecipesByTag';
import IRecipe from '../lib/IRecipe';

export interface ISearchProps {};

const Search: React.FunctionComponent<ISearchProps> = props => {
  let { input } = useParams()
  const navigate = useNavigate();
  const [tags, setTags]:any[] = useState([])
  const [recipes, setRecipes]:any[] = useState([])
  const recipesCollectionRef = collection(db, "recipes")
  const [form, setForm] = useState<String>("");

  let searchResults = <div></div>

  useEffect(() => {
    const getSearchResults = async () => {
      if(input !== undefined) {
        const words = input?.split(" ")
        console.log(words)
        let tagResults: string[] = []
        let recipeResults: IRecipe[] = []

        await words.forEach(async word => {
          const recipesRes = await getRecipesByTag(word)
          if(recipesRes.length !== 0) {
            tagResults.push(word)
          }
          recipeResults.concat(recipesRes)
          console.log(recipesRes)
        })

        setTags(tagResults)
        setRecipes(recipeResults)

        searchResults = (
          <div>
            <div>
              {/* <p>Tag Results:</p>
              {tagResults.map((tag:string, i:any) => {
                <p key={i}>{tag}</p>
              })} */}
            </div>
            <div>
              <p>Recipe Results:</p>
              <RecipeCardContainer recipes={recipeResults} />
            </div>
          </div>
        )

        console.log("here")

      }
    }
    getSearchResults();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    navigate(`/search/${form.trim()}`)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(e.target.value)
  }

  return (
    <div>
      <div className='search-form-wrapper mt-4 mb-4'>
        <p className='sm:text-lg w-full max-w-lg m-auto'>Use the search bar to search for a recipe. At the moment, recipes with tags can be searched.</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="search-bar-wrapper m-auto">
            <input
              className='search-bar w-full mt-4 mb-0'
              type="text"
              onChange={e => handleInputChange(e)} />
            <div className="w-full">
              <button type="submit" className='button strong-button mt-0.5 mb-4 w-full'>Search</button>
            </div>
          </div>
        </form>
      </div>
      <div className='search-results'>
        {input}
        {searchResults}
        {/* <h1>Results for {input}</h1>
        <RecipeCardContainer recipes={recipes} /> */}
      </div>
    </div>
  );
};

export default Search