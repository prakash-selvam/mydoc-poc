import React from 'react/addons';
import AuthenticatedComponent from './AuthenticatedComponent';




var ReactPropTypes = React.PropTypes;


export default AuthenticatedComponent(class MessageComposer extends React.Component {
       propTypes: {
    message: ReactPropTypes.object
  }


 
  
  render() {
    





    return (
      <div>
         <span className="userMsgBox">
            <label for="typeMsgInput" className="sr-only">Type a message</label>
            <textarea className="form-control" id="typeMsgInput" placeholder="Type a message..."></textarea>
        </span>

        <span className="leftBlock">
            <label for="attachFile">
                <i className="attachIcon svg-chat-icon-attachments svg-chat-icon-attachments-dims"></i>
            </label>
            <input type="file" id="attachFile" />
        </span>

        <button type="button" className="sendBtn btn btn-primary">Send</button>
      </div>
    );
  }

  });