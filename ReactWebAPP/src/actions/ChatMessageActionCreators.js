import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {CLICK_THREAD,RECEIVE_PREVIOUS_MESSAGES} from '../constants/ConversationConstants.js';


export default {

receivePreviousMessages: (rawMessages) =>  {

  	AppDispatcher.dispatch({
      actionType: RECEIVE_PREVIOUS_MESSAGES,
      rawMessages: rawMessages
    });
  }

}