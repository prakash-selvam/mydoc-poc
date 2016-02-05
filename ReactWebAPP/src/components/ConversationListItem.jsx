var React = require('react');
var classNames = require('classnames');

var ReactPropTypes = React.PropTypes;

import AuthenticatedComponent from './AuthenticatedComponent';
import ChatConversationActionCreators from '../actions/ChatConversationActionCreators';

export default AuthenticatedComponent(class ConversationListItem extends React.Component {

  constructor(props) {
    super(props);    
  }

  render() {
    var conversation = this.props.conversation;
   
    return (
      <a className={classNames({
          'convoBox': true,
          'active': conversation.episodeId === this.props.currentEpisodeId
        })} onClick={this._onClick.bind(this)}>
                <div className="leftBlock">
                    <i className="vAlign circle"></i>
                    <img src={conversation.imageUrl} alt="User Avatar" className="vAlign botAvatar img-circle  svg-diary-bot-minty-dims" />
                </div>
                <h4 className="convoName">{conversation.name} </h4>

                <p className="timeDisplay">{conversation.date}</p>

                <p className="vAlign convoBlurb">{conversation.message}</p>
            </a>
    );
  }

   _onClick() { 
       ChatConversationActionCreators.clickThread(this.props.conversation.episodeId,this.props.conversation.chatType);
    }
});

AuthenticatedComponent.propTypes  = {  conversation: ReactPropTypes.object,currentEpisodeId: ReactPropTypes.string,chatType:ReactPropTypes.string};
