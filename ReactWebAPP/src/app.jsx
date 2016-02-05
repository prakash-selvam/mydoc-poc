import React from 'react';
import Router, {Route} from 'react-router';
import AuthenticatedApp from './components/AuthenticatedApp'
import Login from './components/Login';
import Signup from './components/Signup';
import Quote from './components/Quote';
import Home from './components/Home';
import RouterContainer from './services/RouterContainer';
import LoginActions from './actions/LoginActions';


window.React = React; 

var routes = (
  <Route handler={AuthenticatedApp}>
    <Route name="login" handler={Login}/>
    <Route name="signup" handler={Signup}/>
    <Route name="home" path="/" handler={Home}/>
    <Route name="quote" handler={Home}/>
  </Route>
);

var router = Router.create({routes});
RouterContainer.set(router);

let authtoken = localStorage.getItem('authtoken');
let chatId = localStorage.getItem('chatId');
let account = JSON.parse(localStorage.getItem('account'));
//console.log(account);
if (authtoken) {
  LoginActions.loginUser(authtoken,chatId,account);
}

router.run(function (Handler) {
  React.render(<Handler />, document.getElementById('content'));
});

