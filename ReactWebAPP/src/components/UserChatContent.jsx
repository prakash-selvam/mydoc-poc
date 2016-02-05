import React from 'react/addons';
import AuthenticatedComponent from './AuthenticatedComponent'
import AttachmentChatContent from './AttachmentChatContent';
import {IMAGE_TYPE,DOC_TYPE,VIDEO_TYPE,AUDIO_TYPE,REFERRAL_TYPE,MESSAGE_TYPE} from '../constants/ConversationConstants';

var ReactPropTypes = React.PropTypes;


export default AuthenticatedComponent(class UserChatContent extends React.Component {
       propTypes: {
    message: ReactPropTypes.object
  }


  getChatText(message){
  	 var text = '';
    if(message.attachment ==null || message.attachment.sub_type==MESSAGE_TYPE){
      text = <p className="roundedBox blueBg"> {message.text}</p> ;
    }else if(message.attachment && message.attachment.sub_type==DOC_TYPE){
      // text = '<a href="'+message.attachment.url+'" target="_blank"><img src="images/doc.png" alt="doc" /></a>';
        text = <AttachmentChatContent url={message.attachment.url} image={"images/attachment-document.png"} type={"doc"} />
    }
    else if(message.attachment && message.attachment.sub_type==VIDEO_TYPE){
      text = <AttachmentChatContent url={message.attachment.url} image={"images/attachment-video.png"} type={"video"} />
    }
    else if(message.attachment && message.attachment.sub_type==REFERRAL_TYPE){
       text = <AttachmentChatContent url={message.attachment.url} image={"images/attachment-referral.png"} type={"referral"} />;
    }
    else if(message.attachment && message.attachment.sub_type==IMAGE_TYPE){
       text = <AttachmentChatContent url={message.attachment.url} image={"images/attachment-image.png"} type={"image"} />;
    }
     else if(message.attachment && message.attachment.sub_type==AUDIO_TYPE){
       text = <AttachmentChatContent url={message.attachment.url} image={"images/attachment-audio.png"} type={"audio"} />;
    }

    return text;

  }
 
  render() {
    var message = this.props.message;
    var text = this.getChatText(message);
    return (
      <div>
      
        <div className="patientStream">
         <p className="streamTimeDisplay">{message.date}</p>
            {text}
        </div>
        <div className="clearfix"></div>
      </div>
    );
  }

  });