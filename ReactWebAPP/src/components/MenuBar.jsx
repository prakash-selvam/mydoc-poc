import React from 'react/addons';
import AuthService from '../services/AuthService'
import AuthenticatedComponent from './AuthenticatedComponent';

export default AuthenticatedComponent( class MenuBar extends React.Component {

 logout(e) {
    e.preventDefault();
    AuthService.logout();
  }

  render() {
    return (
               <div className=" col-md-5 col-lg-4 logoGroupCol">
                    <span className="logoGroup">
                        <button type="button" className="btn btn-default hamburgerBtn" id="menu-toggle">
                            <i className="glyphicon glyphicon-menu-hamburger"></i>
                            <p>Menu</p>
                        </button>
                        <i className="leftBlock svg-logo svg-logo-dims"></i>
                    </span>                                  
					<div href="#" className="dropdown" id="small-menu-btn">
                        <button type="button" className="btn btn-default dropdown-toggle hamburgerBtn" data-toggle="dropdown">
                            <i className="glyphicon glyphicon-menu-hamburger"></i>
                            <p>Menu</p>
                        </button>
                        <ul className="dropdown-menu">
                            <li><a href="#">User Settings</a></li>
                            <li><a href="#">Messages</a></li>
                            <li><a href="#">Peers</a></li>
                            <li><a href="#">Consults</a></li>
                            <li><a href="#">Patients</a></li>
                            <li><a href="#" onClick={this.logout} >Logout</a></li>
                        </ul>
                    </div>    
                </div>
    )
}

});