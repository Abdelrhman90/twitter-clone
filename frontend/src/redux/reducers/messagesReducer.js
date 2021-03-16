import {
  CREATE_MESSAGE_FAIL,
  CREATE_MESSAGE_SUCCESS,
  GET_MESSAGES_FAIL,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_REQUEST,
} from "../types";

const initialState = {
  messages: [],
  message: {},
  errors: null,
  loading: true,
};

export const messagesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_MESSAGES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: [...state.messages, payload],
      };
    case CREATE_MESSAGE_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: payload.messages.filter(
          (message) => message.chat === payload.chatId
        ),
      };
    case GET_MESSAGES_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };

    default:
      return state;
  }
};
