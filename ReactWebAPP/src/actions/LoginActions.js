import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {LOGIN_USER, LOGOUT_USER,CHAT_BASE_URL,LOGIN_ERROR} from '../constants/AppConstants.js';
import RouterContainer from '../services/RouterContainer';

//var ProcessLoginAction =  require('./ProcessLoginAction');
//var ChatExampleData = require('../ChatExampleData');
//var ChatWebAPIUtils = require('../utils/ChatWebAPIUtils');
//var ConnectUtils = require('../utils/Connect');

//console.log(ConnectUtils);

export default {
  loginUser: (authtoken,chatId,account) => {
    var savedAuthtoken = localStorage.getItem('authtoken');
    AppDispatcher.dispatch({
      actionType: LOGIN_USER,
      authtoken: authtoken,
      chatId:chatId,
      account:account
    });

   
   
 
    if (savedAuthtoken !== authtoken) {
      var nextPath = RouterContainer.get().getCurrentQuery().nextPath || '/';

      RouterContainer.get().transitionTo(nextPath);
      localStorage.setItem('authtoken', authtoken);
      localStorage.setItem('chatId', chatId);
      localStorage.setItem('account', JSON.stringify(account));
      //ProcessLoginAction.processLogin();
      //ChatExampleData.init(); // load example data into localstorage
      //ChatWebAPIUtils.getAllMessages();
      //ConnectUtils.init("jKzgNRwFUBbTQqQRfzvPRFMSij3wMIZgnmfDgDr2","",CHAT_BASE_URL);
      //var message = {};
     // message.text = "hi";
      // ConnectUtils.sendMessage(message);
    }else{
        RouterContainer.get().transitionTo('/');
      //RouterContainer.get().transitionTo('/');
       /*// localStorage.removeItem('authtoken');
        localStorage.clear();
        AppDispatcher.dispatch({
          actionType: LOGOUT_USER
        });*/
    }
  },
  logoutUser: () => {
    RouterContainer.get().transitionTo('/login');

   // localStorage.removeItem('authtoken');
   localStorage.clear();
    AppDispatcher.dispatch({
      actionType: LOGOUT_USER
    });
  },
  loginError:(error) =>{
    AppDispatcher.dispatch({
      actionType: LOGIN_ERROR,
      error:error
    });
  }
}
