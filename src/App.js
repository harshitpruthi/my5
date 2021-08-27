import './App.css';

import React, {
  lazy,
  Suspense,
} from 'react';

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

const LoginPage = lazy(() => import('./views/LoginPage'));
const HomePage = lazy(() => import('./views/HomePage'));
const SelectStockPage = lazy(() => import('./views/SelectStockPage'));
const AddStocksPage = lazy(() => import('./views/AddStocksPage'));
const LeaderBoardPage = lazy(() => import('./views/LeaderBoardPage'));

const App = () => {
  return (
    <div className="mainApp">
      <Router>
        <Suspense fallback={<div></div>}>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/select-stocks" component={SelectStockPage} />
            <Route exact path="/add-stocks" component={AddStocksPage} />
            <Route exact path="/leaderboard" component={LeaderBoardPage} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
