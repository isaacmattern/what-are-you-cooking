import { collection } from 'firebase/firestore';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../App';

export interface ISearchProps {};

const Search: React.FunctionComponent<ISearchProps> = props => {
  let { input } = useParams()
  const navigate = useNavigate();
  const [recipes, setRecipes]:any[] = useState([])
  const recipesCollectionRef = collection(db, "recipes")
  const [form, setForm] = useState<String>("");

  let searchResults = <div></div>

  useEffect(() => {
    const checkUserExistsAndSetReciptes = async () => {
      console.log(input)
    }
    checkUserExistsAndSetReciptes();
  }, [input]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    navigate(`/search/${form}`)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(e.target.value)
  }

  return (
    <div>
      <div className='search-form-wrapper mt-4 mb-4'>
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