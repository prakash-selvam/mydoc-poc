import request from 'reqwest';
import when from 'when';
import AppConstants from '../constants/AppConstants';
import LoginActions from '../actions/LoginActions';

class AuthService {

  login(username, password) {
    return this.handleAuth(when(request({
      url: AppConstants.LOGIN_URL,
      method: 'POST',
      data:{
        grant_type:AppConstants.GRANT_TYPE,
        client_secret:AppConstants.CLIENT_SECRET,
        username:username,
        password:password,
        client_id:AppConstants.CLIENT_ID
      },
      type: 'json',
      crossOrigin: true,
      
    })));
  }

  logout() {
    LoginActions.logoutUser();
  }

  signup(username, password, extra) {
     //return this.handleAuth();
    
    return this.handleAuth(when(request({
      url: SIGNUP_URL,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {
        username, password, extra
      }
    })));
  }

  handleAuth(loginPromise) {
    return loginPromise
      .then(function(response) {
         var authtoken = response.data.authentication.access_token;
         var account = response.data.account
         LoginActions.loginUser(authtoken,account.chat_id.username,response.data.account);
        return true;
      }).catch(function(err){
           LoginActions.loginError(err)
          return true;
      })
  } 
}

export default new AuthService()
