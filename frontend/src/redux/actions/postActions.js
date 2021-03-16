import axios from "axios";
import {
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  GET_POSTS_FAIL,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  TOGGLE_POST_LIKE_FAIL,
  TOGGLE_POST_LIKE_SUCCESS,
  TOGGLE_POST_RETWEET_FAIL,
  TOGGLE_POST_RETWEET_SUCCESS,
  GET_POST_FAIL,
  GET_POST_SUCCESS,
  DELETE_POST_FAIL,
  DELETE_POST_SUCCESS,
  GET_USER_POSTS_FAIL,
  GET_USER_POSTS_SUCCESS,
  GET_USER_POSTS_REQUEST,
  GET_USER_REPLIES_FAIL,
  GET_USER_REPLIES_REQUEST,
  GET_USER_REPLIES_SUCCESS,
  POST_PIN_FAIL,
  POST_PIN_SUCCESS,
  POST_UNPIN_FAIL,
  POST_UNPIN_SUCCESS,
  GET_USER_PINNED_POSTS_SUCCESS,
  GET_USER_PINNED_POSTS_FAIL,
  TOGGLE_USERS_MODE,
  TOGGLE_POSTS_MODE,
} from "../types";

export const listPosts = (searchTerm = null) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({ type: GET_POSTS_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      params: {
        followingOnly: searchTerm ? false : true,
        search: searchTerm ? searchTerm : null,
      },
    };

    const { data } = await axios.get("/api/posts", config);
    dispatch({ type: GET_POSTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_POSTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const listUserPosts = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
      profile: { profile },
    } = getState();
    dispatch({ type: GET_USER_POSTS_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      params: {
        postedBy: profile._id,
        isReply: false,
      },
    };

    const { data } = await axios.get("/api/posts", config);
    dispatch({ type: GET_USER_POSTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_POSTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const listUserPinnedPost = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
      profile: { profile },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      params: {
        postedBy: profile._id,
        pinned: true,
      },
    };

    const { data } = await axios.get("/api/posts", config);
    dispatch({ type: GET_USER_PINNED_POSTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_PINNED_POSTS_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const listUserReplies = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
      profile: { profile },
    } = getState();
    dispatch({ type: GET_USER_REPLIES_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      params: {
        postedBy: profile._id,
        isReply: true,
      },
    };

    const { data } = await axios.get("/api/posts", config);
    dispatch({ type: GET_USER_REPLIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_REPLIES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getPost = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/posts/${id}`, config);
    dispatch({
      type: GET_POST_SUCCESS,
      payload: {
        post: data.postData,
        replies: data.replies,
        replyTo: data.replyTo,
      },
    });
  } catch (error) {
    dispatch({
      type: GET_POST_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const createPost = (content, id = undefined) => async (
  dispatch,
  getState
) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({ type: CREATE_POST_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "/api/posts",
      { content, replyTo: id },
      config
    );

    dispatch({ type: CREATE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_POST_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const togglePostLike = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/posts/${id}/like`, {}, config);
    dispatch({
      type: TOGGLE_POST_LIKE_SUCCESS,
      payload: { id, likes: data.likes },
    });
  } catch (error) {
    dispatch({
      type: TOGGLE_POST_LIKE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const togglePostRetweet = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.post(`/api/posts/${id}/retweet`, {}, config);
    dispatch({
      type: TOGGLE_POST_RETWEET_SUCCESS,
    });
    const { data } = await axios.get("/api/posts", config);
    dispatch({ type: GET_POSTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TOGGLE_POST_RETWEET_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const pinPost = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/posts/${id}`, { pinned: true }, config);
    dispatch({
      type: POST_PIN_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: POST_PIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const unpinPost = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/posts/${id}`, { pinned: false }, config);
    dispatch({
      type: POST_UNPIN_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: POST_UNPIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deletePost = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/posts/${id}`, config);
    dispatch({
      type: DELETE_POST_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: DELETE_POST_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const toggleSearchMode = () => (dispatch, getState) => {
  const { mode } = getState().searchMode;
  if (mode === "postsMode") {
    dispatch({ type: TOGGLE_USERS_MODE });
  } else {
    dispatch({ type: TOGGLE_POSTS_MODE });
  }
};
