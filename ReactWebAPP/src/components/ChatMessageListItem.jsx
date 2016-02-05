import React from 'react/addons';
import AuthenticatedComponent from './AuthenticatedComponent';
import UserChatContent from './UserChatContent';
import OthersChatContent from './OthersChatContent';
import UserUtils from '../utils/UserUtils';



var ReactPropTypes = React.PropTypes;


export default AuthenticatedComponent(class ChatMessageListItem extends React.Component {
       propTypes: {
    message: ReactPropTypes.object
  }


 getUserChatContent(message){
    return (<UserChatContent />);
 }

 getOthersContent(message){
     return (<OthersChatContent message={message} />);
 }
  
  render() {
    var message = this.props.message;
    var account = UserUtils.getAccountDetails();
    var messageList;
    
    if(account.id == message.senderId){
        
        messageList = <UserChatContent message={message} />; 
       

    }else{
        
        messageList = this.getOthersContent(message);
      
    }





    return (
      <div>
      {messageList}
      </div>
    );
  }

  });