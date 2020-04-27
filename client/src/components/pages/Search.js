import React, { useContext, useState } from 'react';
import FormAddons from '../form/FormAddons';
import RecipeList from '../recipes/RecipeList';
import RecipeContext from '../../context/recipe/recipeContext';

const Search = () => {
  const recipeContext = useContext(RecipeContext);
  const { searchRecipes, searchResults, loading } = recipeContext;

  const [query, setQuery] = useState('');

  const onSearch = () => {
    searchRecipes(query);
  };

  return (
    <div className='container is-fluid'>
      <div>
        <h1 className='is-size-4 is-uppercase has-text-weight-light has-text-grey-darker'>
          Search Recipes
        </h1>

        <FormAddons
          value={query}
          onChange={setQuery}
          onKeyDown={(e) => e.keyCode === 13 && onSearch()}
          buttonText='Search'
          buttonColor='info'
          onClick={onSearch}
        />
      </div>
      <div>
        <RecipeList recipes={searchResults} loading={loading} />
      </div>
    </div>
  );
};

export default Search;
