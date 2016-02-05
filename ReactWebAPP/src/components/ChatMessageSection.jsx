'use strict';

import React from 'react/addons';
import ChatMessageListItem from '../components/ChatMessageListItem';
import ConversationStore from '../stores/ConversationStore';
import MessageStore from '../stores/MessageStore';
import AuthenticatedComponent from './AuthenticatedComponent'
import  ConversationService from '../services/ConversationService'; 
import MessageComposer  from '../components/MessageComposer';

export default AuthenticatedComponent(class ChatMessageSection extends React.Component {

	constructor() {
    super()
       
       this.state = {
        	messages:null
       }
       this._onChange = this._onChange.bind(this);
  }

   getStateFromStores() {
      return {
        messages: MessageStore.getPreviousMessages(),
        
      };
  }

  componentDidMount() {
    MessageStore.addChangeListener(this._onChange);
    ConversationStore.addChangeListener(this._onChange);
   
  }

  componentWillUnmount() {
    MessageStore.removeChangeListener(this._onChange);
    ConversationStore.addChangeListener(this._onChange);
 
  }

  _onChange() {   
     this.setState(this.getStateFromStores());
  }

   

   getMessageListItem(message) {
  return (
    <ChatMessageListItem
      key={message.id}
      message={message}
    />
  );
}

   render() {
  	
   	var title = (this.state.messages)?this.state.messages.title: '';
   	var messages = (this.state.messages) ? this.state.messages.messages: null;
   	var messageListItems =(this.state.messages) ? messages.map(this.getMessageListItem) : '';

    return (
          <div>
            <div className="titleNavBar">
                <a href="javascript:void(0);" id="back-convos-btn" className="backConvosBtn svg-back-arrow svg-back-arrow-dims" ></a>
                <h4>{title}</h4>
                <div className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" id="detailsDropdown">
                        <span className="detailsBtn svg-details-icon svg-details-icon-dims"></span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-right">
                        <li><a href="#">Option A</a></li>
                        <li><a href="#">Option B</a></li>
                        <li><a href="#">Option C</a></li>
                    </ul>
                </div>
            </div>
            <span className="singleConvoScrollArea">
                <div className="convoStream">
                   
                    {messageListItems}
                </div>    
            </span>

            <div className="typeMsgArea">
                    <MessageComposer />
            </div>  

          </div>
    );

   }


});

