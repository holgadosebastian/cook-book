import React, { useContext, useEffect, useState } from 'react';
import Columns from '../../components/elements/columns';
import { FormAddons } from '../../components/form';
import RecipeList from '../../components/recipes/recipeList/recipeList';
import RecipeContext from '../../context/recipe/recipeContext';
import AuthContext from '../../context/auth/authContext';

const Search = () => {
  const recipeContext = useContext(RecipeContext);
  const { searchRecipes, searchResults, loading } = recipeContext;

  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  const [query, setQuery] = useState('');
  const [previousQuery, setPreviousQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onSearch = () => {
    // Prevents searching twice with same query
    if (previousQuery === '' || previousQuery !== query) {
      if (!hasSearched) setHasSearched(true);

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

        <Columns centered>
          <Columns.Column size={6}>
            <FormAddons
              placeholder='Type your search'
              value={query}
              onChange={setQuery}
              onKeyDown={(e) => e.keyCode === 13 && onSearch()}
              buttonText='Search'
              buttonColor='info'
              onClick={onSearch}
            />
          </Columns.Column>
        </Columns>
      </div>
      <div>
        {hasSearched && (
          <RecipeList recipes={searchResults} loading={loading} />
        )}
      </div>
    </div>
  );
};

export default Search;
