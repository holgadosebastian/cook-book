import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Recipe from './components/pages/Recipe';

import RecipeState from './context/recipe/RecipeState';
import NewRecipe from './components/pages/NewRecipe';

function App() {
  return (
    <RecipeState>
      <Router>
        <div className='App'>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/new-recipe' component={NewRecipe} />
            <Route exact path='/recipe/:id' component={Recipe} />
          </Switch>
        </div>
      </Router>
    </RecipeState>
  );
}

export default App;
