
var ChatServerActionCreators = require('../actions/ChatServerActionCreators');

//console.log(ConnectUtils,ChatServerActionCreators);
module.exports = {

  getAllMessages: function() {
    // simulate retrieving data from a database
    var rawMessages = JSON.parse(localStorage.getItem('messages'));

    // simulate success callback
    ChatServerActionCreators.receiveAll(rawMessages);
  },

  showReceiveMessage:function(message,threadName){
      var rawMessages = JSON.parse(localStorage.getItem('messages'));
      var timestamp = Date.now();
      var id = 'm_' + timestamp;
      var threadID = message.threadID || ('t_' + Date.now());
      var createdMessage = {
        id: id,
        threadID: threadID,
        threadName: threadName,
        authorName: message.authorName,
        text: message.text,
        timestamp: timestamp
      };
      rawMessages.push(createdMessage);
      localStorage.setItem('messages', JSON.stringify(rawMessages));

      // simulate success callback
      setTimeout(function() {
        ChatServerActionCreators.receiveCreatedMessage(createdMessage);
      }, 0);
  },

  createMessage: function(message, threadName) {
     
      
    //console.log(ConnectUtils);
    
  
    var rawMessages = JSON.parse(localStorage.getItem('messages'));
    var timestamp = Date.now();
    var id = 'm_' + timestamp;
    var threadID = message.threadID || ('t_' + Date.now());
    var createdMessage = {
      id: id,
      threadID: threadID,
      threadName: threadName,
      authorName: message.authorName,
      text: message.text,
      timestamp: timestamp
    };
    rawMessages.push(createdMessage);
    localStorage.setItem('messages', JSON.stringify(rawMessages));

    // simulate success callback
    setTimeout(function() {
      ChatServerActionCreators.receiveCreatedMessage(createdMessage);
    }, 0);
  },

  sendMessage:function(message) {

  console.log(message);


  }



};
