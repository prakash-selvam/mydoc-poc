import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent'
import LoginStore from '../stores/LoginStore.js';
import ChatApp from '../components/ChatApp';
import  ConversationService from '../services/ConversationService';

export default AuthenticatedComponent(class Home extends React.Component {

   constructor() {
      super()
    }
  render() {
    return (
            
            <div>
              <ChatApp />
            </div>
           
          );
  }
});
