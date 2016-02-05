'use strict';
import ConversationConstants from '../constants/ConversationConstants';
import UserUtils from './UserUtils';



 // To get a preview message text
function getPreviewText(message,senderName,userType){
      var chatId = UserUtils.getUserChatId();
      var text;
      if(userType == ConversationConstants.PEER_TYPE) { 
        text = (chatId == message.from) ? "You" : '';
     }else if(userType == ConversationConstants.GROUP_TYPE){
        text = (chatId == message.from) ? "You" : senderName ;
     }

      

       if(message.payload_type == ConversationConstants.TEXT_TYPE){
         text = (text!='') ? text + ": " + message.payload : message.payload;
         //console.log(text)
        // console.log(text.length)
        if(text.length> 35){
           console.log(true);
             text =  text.substr(0,35) + "....";  
        }
          
       }else{
         //Added to check , if type is message and sub_type is not text
          if(message.payload_type == ConversationConstants.MESSAGE_TYPE){ 
            text = text + " sent a " + message.payload_type;
          }else{
             text =  text + " sent a " + message.payload_type;
          }
       }
       return text;

}

function getFilterMessage(message,chatUsers,chatGroups,userType){
  
   var filterMessage = {};
   var userObj = {};
   var senderName = '';
   var episodeId;
   var chatType;
  for (var id in chatUsers){
     if(message.from == id){
      userObj = chatUsers[id];
       var toId = message.to.substring(message.to.lastIndexOf("_")+1,message.to.lastIndexOf("@"));
       var fromId = message.from.substring(message.from.lastIndexOf("_")+1,message.from.lastIndexOf("@"));
       var account = UserUtils.getAccountDetails();
       //To get the peer id to fetch the previous messages
       episodeId = (account.id == fromId) ? toId : fromId;
       // To show the peername/avathar image
       userObj = (account.id == fromId) ?  chatUsers[message.to] : chatUsers[message.from];
      chatType = ConversationConstants.PEER_TYPE;
      break;
    }
   }

   if(chatGroups){ 
     for (var id in chatGroups){
       if(message.to == id){
        //console.log(chatUsers);
        //console.log(message);
          senderName =  (chatUsers[message.from])? chatUsers[message.from].display_name:message.from;
          userObj = chatGroups[id];
          chatType = ConversationConstants.GROUP_TYPE;
         episodeId = message.to.substring(message.to.lastIndexOf("_")+1,message.to.lastIndexOf("@"));
        break;
      }
     }
  }
  //console.log(chatGroups);

  //console.log(chatUsers);
  // get episodeId
  filterMessage.episodeId= episodeId;
  //console.log(filterMessage.episodeId);
  //filterMessage.episodeId = message.object_id;
  filterMessage.text = getPreviewText(message,senderName,userType)
  filterMessage.imageUrl= (userObj.avatar) ? userObj.avatar+"?access_token="+UserUtils.getAuthToken() : "http://placehold.it/50/55C1E7/fff&text="+userObj.display_name.substr(0,1);
  filterMessage.name =  userObj.display_name;
  filterMessage.id = message.object_id;
  filterMessage.date = getMessageDate(message.object_time); 
  filterMessage.type = message.payload_type;
  filterMessage.chatType = chatType
  //console.log(filterMessage);
   return filterMessage;

}

function getMessageDate(timeStamp,type){
  var msgDate = new Date(timeStamp);
  var currentDate =  new Date();
  var time = msgDate.toLocaleTimeString().split(":");
  time = time[0]+":"+time[1]+" "+time[2].substr(3,2);
  var day = (type)? msgDate.toDateString().substr(4) + "," + time :  msgDate.toDateString().substr(4);
  var date = (msgDate.toLocaleDateString()  == currentDate.toLocaleDateString())? time
    :  day ;
  return date;
}




 function getSortMessages (msgs,type){

    if(type == "top"){ //Show recent message on top
        msgs.sort(function(a, b) {
          var aDate = new Date(a.object_time);
          var bDate = new Date(b.object_time)
          if (aDate.getTime() > bDate.getTime()) {
            return -1;
          } else if (aDate.getTime() < bDate.getTime()) {
            return 1;
          }
          return 0;
        });
        return msgs;
    }else if(type=="bottom"){ //Show recent message on bottom
        msgs.sort(function(a, b) {
          var aDate = new Date(a.published_at);
          var bDate = new Date(b.published_at)
          if (aDate.getTime() < bDate.getTime()) {
            return -1;
          } else if (aDate.getTime() > bDate.getTime()) {
            return 1;
          }
          return 0;
        });
        return msgs;
    }  
  }


module.exports = {

  convertRawMessage: function(rawMessage, currentThreadID) {
    return {
      id: rawMessage.id,
      threadID: rawMessage.threadID,
      authorName: rawMessage.authorName,
      date: new Date(rawMessage.timestamp),
      text: rawMessage.text,
      isRead: rawMessage.threadID === currentThreadID
    };
  },

  getCreatedMessageData: function(text, currentThreadID) {
    var timestamp = Date.now();
    return {
      id: 'm_' + timestamp,
      threadID: currentThreadID,
      authorName: 'Bill', // hard coded for the example
      date: new Date(timestamp),
      text: text,
      isRead: true
    };
  },

  convertRawMessages: function(conMessages,chatUsers,chatGroups) {
      
      var conversations = [];

      //console.log("--",conMessages[0]);

   conMessages = getSortMessages(conMessages,"top");
   
   conMessages.forEach(function(conMessage) {
    //console.log(conMessage);
     var to = conMessage.to;
      if((to.indexOf(ConversationConstants.PEER_TYPE)>-1) ) {

         var message =  getFilterMessage(conMessage,chatUsers,'',ConversationConstants.PEER_TYPE);
          
         var mesgObj = {
            episodeId: message.episodeId,
            id:message.id,
            name: message.name,
            imageUrl:message.imageUrl,
            message: message.text,
            type:message.type,
            isRead:true,
            date:message.date,
            chatType:message.chatType
          };
          conversations.push(mesgObj);
      }
      if((to.indexOf(ConversationConstants.GROUP_TYPE)>-1)){

         var message =  getFilterMessage(conMessage,chatUsers,chatGroups,ConversationConstants.GROUP_TYPE);
          
          var mesgObj = {
            episodeId: message.episodeId,
            id:message.id,
            name: message.name,
            imageUrl:message.imageUrl,
            message: message.text,
            type:message.type,
            isRead:true,
            date:message.date,
            chatType:message.chatType
          };
          conversations.push(mesgObj);
      }

    });

    //console.log(conversations) 
      return conversations;
  },

  convertPreviousMessage:function(previousMessages){

    var messages = [];
    var preMsgObj = {};
    var chatHead = {};
    previousMessages = getSortMessages(previousMessages,"bottom");
    //console.log(previousMessages);
    if(previousMessages.length>=1){
        var lastMsg = previousMessages[previousMessages.length-1]
      if(lastMsg.episode.type == ConversationConstants.GROUP_TEXT){
        chatHead.title = lastMsg.episode.subject;
        chatHead.chatId = ConversationConstants.GROUP_TEXT+'_'+ lastMsg.episode.password +'_'+
        lastMsg.episode.id+ConversationConstants.GROUP_CHAT_EMAIL;
      }else{
           var account = UserUtils.getAccountDetails();
           var peerDetail = (account.id == lastMsg.sender.id)? lastMsg.receivers[0] : lastMsg.sender;
           chatHead.title = peerDetail.title+' '+peerDetail.first_name+' '+peerDetail.last_name;
            chatHead.chatId = peerDetail.chat_id_username
      }
    }
     previousMessages.forEach(function(previousMessage) {
        var  preMsg = {};
         preMsg.id = previousMessage.id;
         preMsg.type = previousMessage.type;
         preMsg.text = previousMessage.content;
         preMsg.date =  getMessageDate(previousMessage.published_at,'withTime');
         preMsg.senderId = previousMessage.sender.id;
         preMsg.senderName = previousMessage.sender.first_name+previousMessage.sender.last_name;
         preMsg.imageUrl = previousMessage.sender.image_url;
         preMsg.attachment = previousMessage.attachment;
         messages.push(preMsg);
     });

     preMsgObj = chatHead;
     preMsgObj.messages = messages;
     //console.log(preMsgObj)
     return preMsgObj;

  }

}
