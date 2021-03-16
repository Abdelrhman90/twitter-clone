import axios from "axios";
import {
  GET_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_USER_FOLLOWING_REQUEST,
  GET_USER_FOLLOWING_SUCCESS,
  GET_USER_FOLLOWING_FAIL,
  GET_USER_FOLLOWERS_FAIL,
  GET_USER_FOLLOWERS_SUCCESS,
  GET_USER_FOLLOWERS_REQUEST,
} from "../types";

export const getUserProfile = (username) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/profile/${username}`, config);
    dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PROFILE_FAIL, payload: error.response.data.message });
  }
};

export const getUserFollowers = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({ type: GET_USER_FOLLOWERS_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}/followers`, config);
    dispatch({ type: GET_USER_FOLLOWERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_FOLLOWERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getUserFollowing = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({ type: GET_USER_FOLLOWING_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}/following`, config);
    dispatch({ type: GET_USER_FOLLOWING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_FOLLOWING_FAIL,
      payload: error.response.data.message,
    });
  }
};
