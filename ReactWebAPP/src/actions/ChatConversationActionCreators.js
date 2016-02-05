import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {CLICK_THREAD,RECEIVE_RAW_MESSAGES} from '../constants/ConversationConstants.js';


export default {


  clickThread: function(episodeId,chatType) {
    AppDispatcher.dispatch({
      actionType: CLICK_THREAD,
      episodeId: episodeId,
      chatType:chatType
    });
  },
	
  receiveAll: (rawMessages) =>  {

  	AppDispatcher.dispatch({
      actionType: RECEIVE_RAW_MESSAGES,
      rawMessages: rawMessages
    });
  }

}
