import React from 'react/addons';
import AuthenticatedComponent from './AuthenticatedComponent'
import UserUtils from '../utils/UserUtils';

var ReactPropTypes = React.PropTypes;


export default AuthenticatedComponent(class AttachmentChatContent extends React.Component {
       propTypes: {
    message: ReactPropTypes.object
  }

 
  render() {
    var url = this.props.url+"?access_token="+UserUtils.getAuthToken();
    return (
      <span className="vAlign">
       <a href={url} target="_blank"><img src={this.props.image} alt={this.props.type} /></a>
      </span>
    );
  }

  });