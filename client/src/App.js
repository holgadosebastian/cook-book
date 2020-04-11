import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import AllRecipes from './components/pages/AllRecipes';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <div className='container is-fluid'>
        <AllRecipes />
      </div>
    </div>
  );
}

export default App;
