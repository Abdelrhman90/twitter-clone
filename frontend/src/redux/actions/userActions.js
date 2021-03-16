import axios from "axios";
import { json } from "body-parser";

import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LOGOUT,
  FOLLOW_USER_FAIL,
  FOLLOW_USER_SUCCESS,
  GET_SEARCH_USERS_SUCCESS,
  SETUP_SOCKET,
  GET_SEARCH_USERS_FAIL,
} from "../types";
import { io } from "socket.io-client";
let socket = io("http://localhost:3000");

export const getUsers = (searchTerm) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      params: {
        search: searchTerm,
      },
    };

    const { data } = await axios.get("/api/users", config);
    dispatch({ type: GET_SEARCH_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SEARCH_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const register = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/register", user, config);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    socket.emit("setup", data.user);

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const login = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/login", user, config);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    socket.emit("setup", data.user);
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const toggleUserFollow = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
      profile: { profile },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/${id}/follow`, {}, config);

    // Updating the user from localstorage
    const userInfoFromLocal = JSON.parse(localStorage.getItem("userInfo"));
    userInfoFromLocal.user = data;
    dispatch({ type: FOLLOW_USER_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(userInfoFromLocal));
  } catch (error) {
    dispatch({
      type: FOLLOW_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");

  dispatch({ type: USER_LOGOUT });
};

export const setupSocket = () => async (dispatch) => {
  socket.on("connected", () => dispatch({ type: SETUP_SOCKET }));
};
