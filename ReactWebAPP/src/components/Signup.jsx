import React from 'react/addons';
import ReactMixin from 'react-mixin';
import Auth from '../services/AuthService'

export default class Signup extends React.Component {

  constructor() {
    super()
    this.state = {
      user: '',
      password: '',
      extra: ''
    };
  }

  signup(e) {
    e.preventDefault();
    Auth.signup(this.state.user, this.state.password, this.state.extra)
      .catch(function(err) {
        alert("There's an error logging in");
        console.log("Error logging in", err);
      });
  }

  render() {
    return (
       <div className="col-sm-12">
      <div className="col-sm-4"></div>
      <div className="col-sm-4 login center-block">
        <h4>Signup</h4>
        <form role="form">
        <div className="form-group">
      
          <input type="text" valueLink={this.linkState('firstName')} className="form-control" id="firstName" placeholder="First Name" />
        </div>
        <div className="form-group">
         
          <input type="text" valueLink={this.linkState('lastName')} className="form-control" id="lastName" placeholder="Last Name" />
        </div>
         <div className="form-group">
       
          <input type="email" valueLink={this.linkState('email')} className="form-control" id="email" ref="email" placeholder="Email" />
        </div>
        <div className="form-group">

          <input type="password" valueLink={this.linkState('password')} className="form-control" id="password" ref="password" placeholder="Password" />
        </div>
        <div className="form-group">
          <input type="password" valueLink={this.linkState('confirmPassword')} className="form-control" id="confirmPassword" ref="confirmPassword" placeholder="Confirm Password" />
        </div>
        <div className="form-group">
          <input type="text" valueLink={this.linkState('contactNumber')} className="form-control" id="contactNumber" ref="contactNumber" placeholder="Contact Number" />
        </div>
        <button type="submit" className="btn btn-default btn-primary" onClick={this.signup.bind(this)}>Continue</button>
      </form>
    </div>
    <div className="col-sm-4"></div>
    </div>
    );
  }
}

ReactMixin(Signup.prototype, React.addons.LinkedStateMixin);
