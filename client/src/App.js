import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import './styles/index.scss';
import './App.css';
import Navbar from './components/layout/navBar';
import Footer from './components/layout/footer';

// Pages
import {
  Home,
  Login,
  NewRecipe,
  NotFound,
  Recipe,
  Register,
  Search,
  User
} from './pages';

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
                    <PrivateRoute path='/new-recipe' component={NewRecipe} />
                    <PrivateRoute path='/search' component={Search} />
                    <Route path='/recipe/:id' component={Recipe} />
                    <Route path='/users/:username' component={User} />
                    <Route path='/register' component={Register} />
                    <Route path='/login' component={Login} />
                    <Route path='/404' component={NotFound} />
                    <Redirect to='/404' />
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
