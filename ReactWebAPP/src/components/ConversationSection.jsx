'use strict';

import React from 'react/addons';
import ConversationListItem from '../components/ConversationListItem';
import ConversationStore from '../stores/ConversationStore';
import AuthenticatedComponent from './AuthenticatedComponent'
import  ConversationService from '../services/ConversationService'; 

export default AuthenticatedComponent(class ConversationSection extends React.Component {

	constructor() {
    super()
        ConversationService.getConversations();
       //this.state = this.getStateFromStores();
       this.state = {
        conversations:[],
        currentEpisodeId:null
       }
       this._onChange = this._onChange.bind(this);
  }

  getStateFromStores() {
      return {
        conversations: ConversationStore.getAllConversations(),
        currentEpisodeId: ConversationStore.getCurrentID(),
      };
  }

  componentDidMount() {

    ConversationStore.addChangeListener(this._onChange);
    //UnreadConversationStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    ConversationStore.removeChangeListener(this._onChange);
    //UnreadConversationStore.removeChangeListener(this._onChange);
  }

  _onChange() {   
     this.setState(this.getStateFromStores());
  }

  render() {
     //console.log(this.state.conversations);
    var conversationListItems = this.state.conversations.map(function(conversation) {
       return (
        <ConversationListItem
          key={conversation.episodeId}
          conversation={conversation}
          currentEpisodeId={this.state.currentEpisodeId}
        />
      );
    }, this);

    return ( 
      <div>
           {conversationListItems}
       </div>
    )
    
  } 

  
});