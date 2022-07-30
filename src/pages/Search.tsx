import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RecipeCardContainer from '../components/RecipeCardContainer';
import getRecipesByTag from '../lib/getRecipesByTag';
import IRecipe from '../lib/IRecipe';

export interface ISearchProps {};

const Search: React.FunctionComponent<ISearchProps> = props => {
  let { input } = useParams()
  const navigate = useNavigate();
  const [tags, setTags]:any[] = useState([])
  const [recipes, setRecipes]:any[] = useState([])
  const [form, setForm] = useState<String>("");
  const [changeState, setChangeState] = useState(0)

  useEffect(() => {
    const getSearchResults = async () => {
      let tagResults: string[] = []
      let recipeResults: IRecipe[] = []
      if(input !== undefined) {
        const words = input?.split(" ")

        for(const word of words) {
          const recipesRes = await getRecipesByTag(word)
          if(recipesRes.length !== 0) {
            tagResults.push(word)
          }
          recipeResults = recipeResults.concat(recipesRes)
        }

        setTags(tagResults)
        setRecipes(recipeResults)
      }
    }
    getSearchResults();
  }, [form, changeState, input]);

  let searchResults = (
    <div>
      <div>
        {tags.length !== 0
          ? (
            <div>
              <p className='sm:text-lg mb-1'>Tag Results:</p>
              {tags.map((tag:string, i:any) => {
                return <p className='recipe-page-tag' key={i} onClick={() => {
                  navigate(`/tags/${tag}`)
                }}
                  >{tag}
                </p>
              })}
            </div>
          )
          : <div><p className='sm:text-lg'></p></div>
        }
      </div>
      <div className='mt-2'>
        {tags.length !== 0
          ? (
            <div>
              <p className='sm:text-lg'>Recipe Results:</p>
              <RecipeCardContainer recipes={recipes} />
            </div>
          )
          : <div></div>
        }
      </div>
    </div>
  );

  if(tags.length !== 0) {
    let el = document.getElementById('no-results')

    if(el !== null) {
      el.style.display = 'hidden'
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate(`/search/${form.trim()}`)
    setChangeState(changeState + 1)

    let el = document.getElementById('no-results')

    if(el !== null) {
      el.style.display = 'block'
    }

  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(e.target.value)
  }

  return (
    <div>
      <div className='search-form-wrapper mt-4 mb-4'>
        <p className='sm:text-lg w-full max-w-lg m-auto'>Use the search bar to search for a recipe. At the moment, only recipes with tags can be searched, and recipes without a tag will not be found.</p>
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
        {searchResults}
        <p id='no-results' className='hidden sm:text-lg'>If no results appear, there were no recipes with those tags.</p>
      </div>
    </div>
  );
};

export default Search