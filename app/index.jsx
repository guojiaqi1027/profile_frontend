import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import StartupPage from './pages/StartupPage';
import NavigatorPanel from './components/panel/NavigatorPanel';
import DashboardPage from './pages/DashboardPage';            
import SearchPage from 'pages/SearchPage';      
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom'
import Cookies from 'js.cookie';
import 'less/main.less';
var startup = Cookies.get('token') ? DashboardPage : LoginPage;
ReactDOM.render(
  (
    <div>
      <NavigatorPanel />
      <div className="pa-page-wrapper">
        <BrowserRouter >
          <Switch>
            <Route exact path="/" component={startup} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/search" component={ SearchPage } />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  ), 
  document.getElementById('root'));