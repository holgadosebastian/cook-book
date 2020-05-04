import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/navBar';
import Footer from './components/layout/footer';

// Pages
import Home from './pages/home';
import Recipe from './pages/recipe';
import User from './pages/user';
import NewRecipe from './pages/newRecipe';
import Register from './pages/register';
import Login from './pages/login';
import Search from './pages/search';

import Notifications from './components/notifications';

import PrivateRoute from './routing/PrivateRoute';
import setAuthToken from './utils/setAuthToken';

import AuthState from './context/auth/AuthState';
import UserState from './context/user/UserState';
import RecipeState from './context/recipe/RecipeState';
import UiState from './context/ui/UiState';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <UserState>
        <RecipeState>
          <UiState>
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
              <Notifications />
            </Router>
          </UiState>
        </RecipeState>
      </UserState>
    </AuthState>
  );
}

export default App;
