import {LOGIN_USER, LOGOUT_USER,LOGIN_ERROR} from '../constants/AppConstants';
import BaseStore from './BaseStore';
import jwt_decode from 'jwt-decode';


class LoginStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._user = null;
    this._authtoken = null;
    this._chatId = null;
    this._error = false;
    this._account = null;
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case LOGIN_USER:
        this._authtoken = action.authtoken;
        this._user = action.authtoken;
        this._chatId = action.chatId;
        this._account = action.account;
        this.emitChange();
        break;
      case LOGOUT_USER:
    
        this._user = null;
        this.emitChange();
        break;
      case LOGIN_ERROR:
        this._error = true;
        this.emitChange();
        break;
      default:
        break;
    };
  }

  get user() {
    return this._user;
  }

  get chatId() {
    return this._chatId;
  }

  get authtoken() {
    return this._authtoken;
  }

 get error() {
    return this._error;
  }

  isLoggedIn() {
    return !!this._user;
  }
  getAuthToken(){
     return this._authtoken;
  }
  getAccountDetails(){
    return this._account;
  }
  getUserChatId(){
    return this._chatId;
  }
}

export default new LoginStore();
