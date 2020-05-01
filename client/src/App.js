import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/footer';
import Home from './pages/home';
import Recipe from './components/pages/Recipe';
import User from './components/pages/User';
import NewRecipe from './components/pages/NewRecipe';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Search from './components/pages/Search';
import PrivateRoute from './components/routing/PrivateRoute';
import setAuthToken from './utils/setAuthToken';

import AuthState from './context/auth/AuthState';
import UserState from './context/user/UserState';
import RecipeState from './context/recipe/RecipeState';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <UserState>
        <RecipeState>
          <Router>
            <div className='app'>
              <Navbar />
              <main>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <PrivateRoute
                    exact
                    path='/new-recipe'
                    component={NewRecipe}
                  />
                  <PrivateRoute exact path='/search' component={Search} />
                  <Route exact path='/recipe/:id' component={Recipe} />
                  <Route exact path='/users/:id' component={User} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </main>
              <Footer />
            </div>
          </Router>
        </RecipeState>
      </UserState>
    </AuthState>
  );
}

export default App;
