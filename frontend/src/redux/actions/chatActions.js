import axios from "axios";
import {
  CREATE_GROUP_CHAT_FAIL,
  CREATE_GROUP_CHAT_SUCCESS,
  GET_CHATS_REQUEST,
  GET_CHATS_SUCCESS,
  GET_CHATS_FAIL,
  GET_CHAT_REQUEST,
  GET_CHAT_SUCCESS,
  GET_CHAT_FAIL,
  UPDATE_CHATNAME_SUCCESS,
  UPDATE_CHATNAME_FAIL,
} from "../types";

export const createGroupChat = (users) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    let jsonUsers = JSON.stringify(users);
    const { data } = await axios.post(
      "/api/chat",
      { users: jsonUsers },
      config
    );
    dispatch({ type: CREATE_GROUP_CHAT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_GROUP_CHAT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getChats = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({ type: GET_CHATS_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/chat", config);
    dispatch({ type: GET_CHATS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_CHATS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getChat = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({ type: GET_CHAT_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/chat/${id}`, config);
    dispatch({
      type: GET_CHAT_SUCCESS,
      payload: { chat: data, users: data.users },
    });
  } catch (error) {
    dispatch({
      type: GET_CHAT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateChatName = (id, name) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/chat/${id}`,
      { chatName: name },
      config
    );
    console.log(data);
    dispatch({ type: UPDATE_CHATNAME_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_CHATNAME_FAIL,
      payload: error.response.data.message,
    });
  }
};
