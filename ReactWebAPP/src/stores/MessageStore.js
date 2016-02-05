'use strict';
import {PEER_TYPE,GROUP_TYPE,CLICK_THREAD,RECEIVE_RAW_MESSAGES,RECEIVE_PREVIOUS_MESSAGES} from '../constants/ConversationConstants';
import BaseStore from './BaseStore';
import AppDispatcher from '../dispatchers/AppDispatcher';
import ChatService from '../services/ChatService';
import ConversationStore from './ConversationStore';



class MessageStore extends BaseStore {

	constructor() {
   		super();
		this._previousMessages = null;
		this.subscribe(() => this._registerToActions.bind(this))
		this._currentID = null;
		this._chatType = null;	
   		 
	}

	_registerToActions(action) {
		
	    switch(action.actionType) {
	      case CLICK_THREAD:
	      	//console.log(action.episodeId);
	      	this._currentID = action.episodeId;
	      	this._chatType = action.chatType;
	      	ChatService.getPreviousMessages(this._currentID,this._chatType);
	        this.emitChange();
	        break;
	      case RECEIVE_RAW_MESSAGES:
	      		AppDispatcher.waitFor([ConversationStore.dispatchToken]);
				this._currentID = ConversationStore.getCurrentID();
	      		this._chatType =  ConversationStore.getChatType();
	      		ChatService.getPreviousMessages(this._currentID,this._chatType);
	      		this.emitChange();
	        break;
	      case RECEIVE_PREVIOUS_MESSAGES:
	          this._previousMessages = action.rawMessages;
	           this.emitChange();
	      default:
	        break;
	    };
  	}

  	getPreviousMessages(){
  		
  		return this._previousMessages;
  	}


	

}

export default new MessageStore();