import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';
import InfoPage from './components/InfoPage/InfoPage';
import StrengthPage from './components/StrengthPage/StrengthPage';
import AerobicPage from './components/AerobicPage/AerobicPage';
import HIIT from './components/HIIT/HIIT';
import YogaPage from './components/YogaPage/YogaPage';
import StrengthComments from './components/StrengthComments/StrengthComments';


import './styles/main.css';


const App = () => (
  <div>
    
    <Header title="FitnessRx" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/user"
          component={UserPage}
        />
        <Route
          path="/info"
          component={InfoPage}
        />
        <Route 
          path="/strength"
          component={StrengthPage}
        />
        <Route 
          path="/aerobic"
          component={AerobicPage}
        />
        <Route 
          path="/HIIT"
          component={HIIT}
        />
        <Route 
          path="/yoga"
          component={YogaPage}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
