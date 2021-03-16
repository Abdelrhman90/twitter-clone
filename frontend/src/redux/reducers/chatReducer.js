import {
  CREATE_GROUP_CHAT_FAIL,
  CREATE_GROUP_CHAT_SUCCESS,
  GET_CHATS_SUCCESS,
  GET_CHATS_FAIL,
  GET_CHAT_SUCCESS,
  GET_CHAT_RESET,
  GET_CHAT_FAIL,
  UPDATE_CHATNAME_SUCCESS,
  UPDATE_CHATNAME_FAIL,
  GET_CHAT_REQUEST,
  GET_CHATS_REQUEST,
  SETUP_SOCKET,
  SHOW_INDICATOR,
  HIDE_INDICATOR,
} from "../types";

const initialState = {
  errors: null,
  loading: true,
  loadingChat: true,
  chats: [],
  chat: {},
};

export const chatsReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_CHATS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CHATS_SUCCESS:
      return {
        ...state,
        loading: false,
        chats: payload,
      };
    case GET_CHATS_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case GET_CHAT_SUCCESS:
      return {
        ...state,
        loadingChat: false,
        chat: payload.chat,
        // users: payload.users,
      };
    case GET_CHAT_REQUEST:
      return {
        loadingChat: true,
      };
    case GET_CHAT_FAIL:
      return {
        ...state,
        loadingChat: false,
        errors: payload,
      };
    case UPDATE_CHATNAME_SUCCESS:
      return {
        ...state,
        loading: false,
        chat: { ...state.chat, chatName: payload.chatName },
      };
    case UPDATE_CHATNAME_FAIL:
      return {
        loading: false,
        errors: payload,
      };
    case GET_CHAT_RESET:
      return {};

    default:
      return state;
  }
};

export const socketReducer = (state = { connected: false }, action) => {
  switch (action.type) {
    case SETUP_SOCKET:
      return {
        connected: true,
      };
    default:
      return state;
  }
};

export const chatReducer = (state = {}, action) => {
  const { payload, type } = action;

  switch (type) {
    case CREATE_GROUP_CHAT_SUCCESS:
      return {
        success: true,
        groupChat: payload,
      };
    case CREATE_GROUP_CHAT_FAIL:
      return {
        errors: payload,
      };
    default:
      return state;
  }
};
