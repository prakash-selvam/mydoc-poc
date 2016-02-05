import React from 'react/addons';
import ReactMixin from 'react-mixin';
import Joi from 'joi';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import classnames from 'classnames';
import LoginStore from '../stores/LoginStore.js';
import Auth from '../services/AuthService'

 class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state ={
      user:'',
      password: '',
      error:false,
      account:null,
      authToken:null
    };
    this._onChange = this._onChange.bind(this);
    this.validatorTypes = {
      username: Joi.string().email().label('Email'),
      password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).label('Password')
    };
    this.getValidatorData = this.getValidatorData.bind(this);
    this.renderHelpText = this.renderHelpText.bind(this);
    this.getClasses = this.getClasses.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
   
  }

  getUserState(){
    return{
      account:LoginStore.authtoken,
      authToken:LoginStore.authToken,
      error:LoginStore.error
    }
  }


  componentDidMount() {

    LoginStore.addChangeListener(this._onChange);
   
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this._onChange);
   
  }
   _onChange() { 
       this.setState(this.getUserState());
    }

  getValidatorData() {
    return {
      username: this.state.user,
      password: this.state.password
    };
  }

  render() {
    return (
      <div>
      <div className="col-sm-12">
      <div className="col-sm-4"></div>
      <div className="col-sm-4 col-xs-11  login center-block">
        <h4>Log into MyDoc</h4>
        {this.showError}
        <form role="form" onSubmit={this.onSubmit}>
        <div  className={this.getClasses('username')}>
          <input type="email" valueLink={this.linkState('user')} value={this.props.username} className="form-control" id="username" placeholder="Email address"  onBlur={this.props.handleValidation('username')}/>
             {this.renderHelpText(this.props.getValidationMessages('username'),"username")}
        </div>

        <div className={this.getClasses('password')}>
          <input type="password" valueLink={this.linkState('password')}  className="form-control" id="password" ref="password" placeholder="Password" 
           onBlur={this.props.handleValidation('password')} />
          {this.renderHelpText(this.props.getValidationMessages('password'),"password")}
        </div>
        <button type="submit" className="btn btn-default btn-primary">Login</button>
      </form>
    </div>
    <div className="col-sm-4"></div>
    </div>
    </div>
    );
  }

  get showError(){
       if (this.state.error){
         
         return (
          <div>
              <div className="alert alert-danger"> 
                  Incorrect email and password combination.
              </div>
             
            </div>
          );

      }
  }
  renderHelpText(message,key) {
     if(message.length>0){
        if(key=="username")
          message = ['Please enter your email address.'];
        if(key=="password")
          message = ['Please enter your password.'];
     }
    return (
     <span className='help-block'>{message}</span>
    );
  }

  getClasses(field) {
    return classnames({
      'form-group': true,
      'has-error': !this.props.isValid(field)
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const onValidate = (error) => {
      if (error) {
        //form has errors; do not submit
      } else {
        Auth.login(this.state.user, this.state.password);
         
      }
    };
    this.props.validate(onValidate);
  }

  
}

Login.propTypes = {
  errors: React.PropTypes.object,
  validate: React.PropTypes.func,
  isValid: React.PropTypes.func,
  handleValidation: React.PropTypes.func,
  getValidationMessages: React.PropTypes.func,
  clearValidations: React.PropTypes.func
};

ReactMixin(Login.prototype, React.addons.LinkedStateMixin);


export default validation(strategy)(Login);