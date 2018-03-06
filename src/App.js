import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom';
import LogInPage from './pages/LogInPage'
import SignUpPage from './pages/SignUpPage'
import logout from './utils/logout';

class App extends Component {
  render() {
    if (localStorage.User) {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">WebOps Social Network!</h1>
            <p id="welcome-user">Welcome {localStorage.userName}</p> 
            <Link className="logout" to="/" onClick={() => logout()}>Log out</Link>
          </header>
        </div>
      );
    }
   else{
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">WebOps Social Network!</h1>
        </header>
         <div className="App-container">
          <Switch>
            <Route path="/" exact component={LogInPage} />
            <Route path="/signup" exact component={SignUpPage} />
          </Switch>
        </div>
       </div> 
      )
   } 
  }
}

export default App;
