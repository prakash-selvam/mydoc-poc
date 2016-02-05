import LoginStore from '../stores/LoginStore.js';


module.exports = {

	getAuthToken:function(){
		return LoginStore.getAuthToken();
	},
	getAccountDetails:function(){
		
		return LoginStore.getAccountDetails();
	},
	getUserChatId:function(){
		return LoginStore.getUserChatId();
	}
}