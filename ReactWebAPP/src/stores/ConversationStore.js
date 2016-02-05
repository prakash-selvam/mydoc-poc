'use strict';
import {PEER_TYPE,GROUP_TYPE,CLICK_THREAD,RECEIVE_RAW_MESSAGES} from '../constants/ConversationConstants';
import BaseStore from './BaseStore';





class ConversationStore extends BaseStore {

	 constructor() {
   		super();
		this._currentID = null;
		this._chatType = null;
		 this.subscribe(() => this._registerToActions.bind(this))
		 this._conversations = [];
   		 
	}


	_registerToActions(action) {
	    switch(action.actionType) {
	      case CLICK_THREAD:
	      	//console.log(action.episodeId);
	      	this._currentID = action.episodeId;
	      	this._chatType = action.chatType;
	        this.emitChange();
	        break;
	      case RECEIVE_RAW_MESSAGES:
	      	this._conversations = action.rawMessages;
	      	if (!this._currentID) {
				var allChrono = this.getAllConversations();
				this._currentID = allChrono[0].episodeId;
				this._chatType = allChrono[0].chatType;
	    	}
	        this.emitChange();
	        break;
	      default:
	        break;
	    };
  	}

	getAllConversations() {
		return this._conversations;
	}

	getCurrentID(){
		return this._currentID;
	}

	getChatType(){
		return this._chatType;
	}

}

export default new ConversationStore();