import React from 'react/addons';
import ConversationSection from '../components/ConversationSection';
import ChatMessageSection from '../components/ChatMessageSection';
import AuthenticatedComponent from './AuthenticatedComponent'
import  ConversationService from '../services/ConversationService';

export default AuthenticatedComponent(class ChatApp extends React.Component {
  constructor() {
    super()
   // ConversationService.getConversations();
  }


  render() {


  
    return (
      <div className="chatapp">
          <div className="col-xs-12 col-md-5 col-lg-4 convoCol">
            <ConversationSection />
          </div>
        <div className="col-xs-12 col-md-7 col-lg-6 singleConvoCol">  
          <ChatMessageSection />
        </div>          
      </div>
    );
  }

});