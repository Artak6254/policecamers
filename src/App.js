import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './page/HomePage';
import Admin from './page/Admin';
import LoginPage from './page/LoginPage';
import PersonAdmin from './page/PersonAdmin';
import Person from './page/Person';
import PersonLogin from './page/PersonLogin';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPersonLogin, setIsPersonLogin] = useState(false)

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/admin"
          element={isLoggedIn ? <Admin /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path='/person/:id' element={<Person/>}/>
        <Route path='/personLogin' element={<PersonLogin setIsPersonLogin={setIsPersonLogin}/>}/>
        <Route path='/presonal_list' element={isPersonLogin ? <PersonAdmin setIsPersonLogin={setIsPersonLogin}/> : <Navigate to="/personLogin"/>} />

      </Routes>
    </div>
  );
}

export default App;
