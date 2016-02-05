import React from 'react/addons';
import AuthService from '../services/AuthService'
import AuthenticatedComponent from './AuthenticatedComponent';

export default AuthenticatedComponent( class Sidebar extends React.Component {

 logout(e) {
    e.preventDefault();
    AuthService.logout();
  }

  render() {
    return (
             <div className="hidden-xs hidden-sm col-md-2 leftNavBar">
            <div href="#" className="dropdown userControlBar">

                <a className="dropdown-toggle" data-toggle="dropdown">
                    <span className="vAlign svg-avatar-blank svg-avatar-blank-dims userAvatar"></span>
                    <p className="vAlign userName">Ann Selby</p>
                    <i className="vAlign glyphicon glyphicon-menu-down"></i>
                </a>

                <ul className="dropdown-menu">
                    <li><a href="#">Option 1</a></li>
                    <li><a href="#">Option 2</a></li>
                    <li><a href="#">Option 3</a></li>
                </ul>
            </div>
            <ul className="mainMenuBar">
                <a href="#" id="messagesMenu">
                    <li>
                        <i className="svg-tab-icon-messages svg-tab-icon-messages-dims"></i>
                        <span className="">Messages</span>
                    </li>
                </a>

                <a href="#" id="peersMenu">
                    <li>
                        <i className="svg-tab-icon-peers svg-tab-icon-peers-dims"></i>
                        <span className="">Peers</span>
                    </li>
                </a>

                    <a href="#" id="consultsMenu">
                    <li>
                        <i className="svg-tab-icon-consults svg-tab-icon-consults-dims"></i>
                        <span className="">Consults</span>
                    </li>
                </a>

                <a href="#" id="patientsMenu">
                    <li>
                        <i className="svg-tab-icon-patients svg-tab-icon-patients-dims"></i>
                        <span className="">Patients</span>
                    </li>
                </a>

                <a href="#" id="logout" onClick={this.logout}>
                    <li>
                        
                        <span className="">Logout</span>
                    </li>
                </a>

                <div className="clearfix"></div>
            </ul>

        </div>
    );
  }
});


