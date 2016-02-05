import request from 'reqwest';
import when from 'when';
import ConversationConstants from '../constants/ConversationConstants';
import LoginStore from '../stores/LoginStore.js';
import ChatMessageUtils  from '../utils/ChatMessageUtils';
import ChatMessageActionCreators from '../actions/ChatMessageActionCreators';

class ChatService {

	getPreviousMessages(id,type){
		var accessToken = "?access_token="+LoginStore.getAuthToken();
		var url = (type == ConversationConstants.PEER_TYPE)? ConversationConstants.PEER_PREVIOUS_MSG_URL + id + accessToken :  
		ConversationConstants.GROUP_PREVIOUS_MSG_URL + id + ConversationConstants.MESSAGES_URL + accessToken;
		//console.log(url);
		return this.handlePreviousMessages(when(request({
	      url: url,
	      method: 'GET',
	      type: 'json',
	      crossOrigin: true,
	      
	    })));
	}
  
  	handlePreviousMessages(loginPromise){
		return loginPromise
	      .then(function(response) {
	         	var previousMessages = ChatMessageUtils.convertPreviousMessage(response.data);

	         	ChatMessageActionCreators.receivePreviousMessages(previousMessages);
	        
	        return true;
	      }).catch(function(err){
	          console.log(err);
	          return true;
	      })
   }

}

export default new ChatService()