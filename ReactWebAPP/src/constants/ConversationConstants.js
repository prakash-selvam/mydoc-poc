import {BASE_URL} from '../constants/AppConstants.js';

export default {
  CONVERSATION_URL:BASE_URL + 'api/v2/accounts/episodes?access_token=',
  CHAT_WS_URL:'wss://dev-ws2.my-doc.com/ws/',
  PEER_TYPE:'doctor_',
  GROUP_TYPE:'group_',
  PEER_TO_PEER_TEXT:'peer-to-peer',
  GROUP_TEXT:'group',
  CLICK_THREAD: 'CLICK_THREAD',
  CREATE_MESSAGE: 'CREATE_MESSAGE',
  RECEIVE_RAW_CREATED_MESSAGE: 'RECEIVE_RAW_CREATED_MESSAGE',
  RECEIVE_RAW_MESSAGES: 'RECEIVE_RAW_MESSAGES',
  TEXT_TYPE:'text',
  IMAGE_TYPE:'image',
  DOC_TYPE:'document',
  MESSAGE_TYPE:'message',
  VIDEO_TYPE:'video',
  AUDIO_TYPE:'audio',
  REFERRAL_TYPE:'referral',
  PEER_PREVIOUS_MSG_URL :BASE_URL + 'api/v2/accounts/peertopeer/',
  GROUP_PREVIOUS_MSG_URL :BASE_URL + 'api/v2/accounts/episodes/',
  MESSAGES_URL:'/messages',
  RECEIVE_PREVIOUS_MESSAGES:'RECEIVE_PREVIOUS_MESSAGES',
  GROUP_CHAT_EMAIL:'@muc.chatserver.com'

}