import React, { useContext, useState } from 'react';
import FormAddons from '../form/FormAddons';
import RecipeList from '../recipes/RecipeList';
import RecipeContext from '../../context/recipe/recipeContext';

const Search = () => {
  const recipeContext = useContext(RecipeContext);
  const { searchRecipes, searchResults, loading } = recipeContext;

  const [query, setQuery] = useState('');
  const [previousQuery, setPreviousQuery] = useState('');

  const onSearch = () => {
    // Prevents searching twice with same query
    if (previousQuery === '' || previousQuery !== query) {
      searchRecipes(query);
      setPreviousQuery(query);
    }
  };

  return (
    <div className='container is-fluid is-main'>
      <div>
        <h1
          style={{ marginBottom: '16px' }}
          className='is-size-3 has-text-centered is-uppercase has-text-weight-light has-text-grey-darker'
        >
          Search Recipes
        </h1>

        <div className='columns is-centered'>
          <div className='column is-half'>
            <FormAddons
              value={query}
              onChange={setQuery}
              onKeyDown={(e) => e.keyCode === 13 && onSearch()}
              buttonText='Search'
              buttonColor='info'
              onClick={onSearch}
            />
          </div>
        </div>
      </div>
      <div>
        <RecipeList recipes={searchResults} loading={loading} />
      </div>
    </div>
  );
};

export default Search;
