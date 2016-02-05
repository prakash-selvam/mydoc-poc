'use strict';

import React from 'react';
import LoginStore from '../stores/LoginStore'
import { Route, RouteHandler, Link } from 'react-router';
import AuthService from '../services/AuthService'
import Sidebar from './Sidebar';
import MenuBar from './MenuBar';

export default class AuthenticatedApp extends React.Component {
  constructor() {
    super()
    this.state = this._getLoginState();
  }

  _getLoginState() {
    return {
      userLoggedIn: LoginStore.isLoggedIn()
    };
  }

  componentDidMount() {
    this.changeListener = this._onChange.bind(this);
    LoginStore.addChangeListener(this.changeListener);
  }

  _onChange() {
    this.setState(this._getLoginState());
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this.changeListener);
  }

  render() {
    return (
      <div>
        <header>
          <div className="container-fluid">
            <div className="row">
                   
                <div className="col-md-0 col-lg-2 leftHeaderCol">
                    <i className="singleLogo svg-logo svg-logo-dims"></i>
                </div>

                <div className=" col-md-5 col-lg-4 logoGroupCol">
                    <span className="logoGroup">
                        <button type="button" className="btn btn-default hamburgerBtn" id="menu-toggle">
                            <i className="glyphicon glyphicon-menu-hamburger"></i>
                            <p>Menu</p>
                        </button>
                        <i className="leftBlock svg-logo svg-logo-dims"></i>
                    </span>
                         {this.menuBarItems}
                     
                          
                </div>
                <div className="col-md-7 col-lg-6 searchCol">
                    {this.headerItems}
                </div>

            </div>
          </div>
        </header>

        <div className="container-fluid">
          <div className="row">
               {this.sidebarItems}
               <RouteHandler />

          </div>
        </div>
    </div>

    );
  }

  logout(e) {
    e.preventDefault();
    AuthService.logout();
  }

  get headerItems() {
    if (!this.state.userLoggedIn) {
      return (
        <div className="searchArea">
          <span> <Link to="login" className="nav-link">Login | </Link> </span>
          <span><Link to="signup" className="nav-link" >Signup</Link> </span>    
        </div>
      )
    } else {
      return (
          <div className="searchArea">
      
           <button type="button" className="btn btn-primary newMsgBtn">New Message</button>             
            <div className="form-group has-feedback searchBox hidden-sm hidden-xs">
                <span className="glyphicon glyphicon-search form-control-feedback searchIcon"></span>
                <label for="searchInput" className="sr-only">Search</label>
                <input type="text" className="form-control" id="searchInput" placeholder="Search" />
            </div>      
            <span className="smallSearchBtn">
                <button type="button" className="btn glyphicon glyphicon-search"></button>
            </span>
            
        </div>


      )
    }
  }

  get sidebarItems(){
     if (this.state.userLoggedIn) {
      return (    <Sidebar />);
     }
  }

get menuBarItems(){
     if (this.state.userLoggedIn) {
      return (    <MenuBar />);
     }
  }

}   

