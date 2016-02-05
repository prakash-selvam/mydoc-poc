import React from 'react/addons';
import AuthenticatedComponent from './AuthenticatedComponent'
import UserUtils from '../utils/UserUtils';
import AttachmentChatContent from './AttachmentChatContent';
import {IMAGE_TYPE,DOC_TYPE,VIDEO_TYPE,AUDIO_TYPE,REFERRAL_TYPE,MESSAGE_TYPE} from '../constants/ConversationConstants';


var ReactPropTypes = React.PropTypes;


export default AuthenticatedComponent(class OthersChatContent extends React.Component {
       propTypes: {
    message: ReactPropTypes.object
  }

  getChatText(message){
    var text = '';
    if(message.attachment ==null || message.attachment.sub_type==MESSAGE_TYPE){
      text = <span className="vAlign roundedBox greyBg"> {message.text} </span>;
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
     var imageUrl = (message.imageUrl) ? message.imageUrl+'?access_token='+UserUtils.getAuthToken(): "http://placehold.it/50/55C1E7/fff&text="+message.senderName.substr(0,1);
      var text = this.getChatText(message);
    return (
      <div className="padding5">

       <div classNae="docStream">
               <p className="streamTimeDisplay">{message.date}</p>
             <img src={imageUrl} alt="User Avatar" className="vAlign   img-circle" />
              {text}
      </div>

       <div className="clearfix"></div>
      </div>
    );
  }

  });