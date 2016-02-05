import request from 'reqwest';
import when from 'when';
import ConversationConstants from '../constants/ConversationConstants';
import ChatConversationActionCreators from '../actions/ChatConversationActionCreators';
import LoginStore from '../stores/LoginStore.js';
import ChatMessageUtils  from '../utils/ChatMessageUtils';

class ConversationService {

		constructor(){
			this.keepAliveInterval;
		}

	getConversations(){
		var wsURI =  ConversationConstants.CHAT_WS_URL + LoginStore.getAuthToken();
    	this.connect(wsURI);
	}

	/*handleConversations(loginPromise){
		return loginPromise
	     	.then(function(response) {
	     		var conMessages = response.data;	     		
	     		var conversations = ChatMessageUtils.convertConMessage(conMessages);	
	     		ChatConversationActionCreators.receiveAll(conversations);
				return true;
	      	}).catch(function(err){
	          // LoginActions.loginError(err)
	           return true;
	    	});
	}*/

	resetKeepAliveInterval(websocket) {
	    clearInterval(this.keepAliveInterval);
	    this.keepAliveInterval = setInterval(function() {
	        if(websocket.readyState === 1) {
	            console.log("Keep-Alive");
	            websocket.send("");
	        }
	    }, 30000);
	}

	connect(wsURI) {
    var _this = this;
    var chatUsers =  [];
    var chatGroups = [];
    var chatMessages = [];
    //console.log("Connecting to " + wsURI);
    var websocket = new WebSocket(wsURI);
    var wsAttempts = 0;
    websocket.onopen = function(evt) { 
         wsAttempts = 0;
        console.log("WS:Connected");
         _this.resetKeepAliveInterval(websocket);
      
    }
    websocket.onclose = function(evt) { // FIXME: add reconnection logic
      
      
    };
    websocket.onmessage = function(wsEvent) {
    	 _this.resetKeepAliveInterval(websocket);
        //console.log("[WS] Recv: " + wsEvent.data);
        var evt = JSON.parse(wsEvent.data);

        switch(evt.object_type) {
            case "message":
              // console.log("----------")
            	 chatMessages = _this.getChatMessages(evt,chatMessages);
	            break;
	         case "user":
	         		//console.log(evt);
	         	chatUsers = _this.getChatUsersForPeers(evt,chatUsers);
	             break;
	         case "group":
	         		//console.log(evt);
	         	chatGroups = _this.getChatGroupsForPeers(evt,chatGroups);

	             break;
	         case "fetch":
	         		//console.log(chatMessages);
	         		//console.log(chatGroups);
	         	 var handleMesseages =  ChatMessageUtils.convertRawMessages(chatMessages,chatUsers,chatGroups);
	         	 //console.log(chatMessages);
	         	ChatConversationActionCreators.receiveAll(handleMesseages);
	         	 break;
            default:
             	break;
        }
    }
    websocket.onerror = function(evt) {
        console.log("[WS] Error!");
    };

    wsAttempts++;
}

getChatUsersForPeers(response,chatUsers){
	if(response.object_id.indexOf(ConversationConstants.PEER_TYPE)>-1){ 
	 chatUsers[response.object_id] = response.payload;
    }
 	return chatUsers;
}

getChatGroupsForPeers(response,chatGroups){
	if(response.object_id.indexOf(ConversationConstants.GROUP_TYPE)>-1){ 
		chatGroups[response.object_id] = response.payload;
	}
	return chatGroups;
}

getChatMessages(response,chatMessages){
	chatMessages.push(response);
	return chatMessages;
}

}


export default new ConversationService()
