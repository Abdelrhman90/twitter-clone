import axios from "axios";
import {
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAIL,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
  GET_MESSAGES_REQUEST,
} from "../types";

export const createMessage = (content, chatId) => async (
  dispatch,
  getState
) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "/api/message",
      { content, chatId },
      config
    );

    dispatch({
      type: CREATE_MESSAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_MESSAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getMessages = (chatId) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({ type: GET_MESSAGES_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/message/${chatId}`, config);

    dispatch({
      type: GET_MESSAGES_SUCCESS,
      payload: { messages: data, chatId },
    });
  } catch (error) {
    dispatch({
      type: GET_MESSAGES_FAIL,
      payload: error.response.data.message,
    });
  }
};
