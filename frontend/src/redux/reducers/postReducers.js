import {
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  GET_POSTS_FAIL,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  TOGGLE_POST_LIKE_SUCCESS,
  TOGGLE_POST_RETWEET_SUCCESS,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
  GET_POST_RESET,
  DELETE_POST_FAIL,
  DELETE_POST_SUCCESS,
  GET_USER_POSTS_FAIL,
  GET_USER_POSTS_SUCCESS,
  GET_USER_POSTS_REQUEST,
  GET_USER_REPLIES_FAIL,
  GET_USER_REPLIES_REQUEST,
  GET_USER_REPLIES_SUCCESS,
  GET_USER_PINNED_POSTS_FAIL,
  GET_USER_PINNED_POSTS_SUCCESS,
  TOGGLE_USERS_MODE,
  TOGGLE_POSTS_MODE,
  GET_POSTS_RESET,
} from "../types";

const initialState = {
  posts: [],
  replies: [],
  pinnedPost: [],
  post: null,
  loading: true,
  errors: null,
  replyTo: null,
  mode: "postsMode",
};

export const postReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: payload,
      };
    case GET_POSTS_FAIL:
      return {
        loading: false,
        errors: payload,
      };
    case GET_USER_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: payload,
      };
    case GET_USER_PINNED_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        pinnedPost: payload,
      };

    case GET_USER_POSTS_FAIL:
      return {
        loading: false,
        errors: payload,
      };
    case GET_USER_PINNED_POSTS_FAIL:
      return {
        loading: false,
        errors: payload,
      };
    case GET_USER_REPLIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_REPLIES_SUCCESS:
      return {
        ...state,
        loading: false,
        replies: payload,
      };
    case GET_USER_REPLIES_FAIL:
      return {
        loading: false,
        errors: payload,
      };

    case GET_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: payload.post,
        replies: payload.replies,
        replyTo: payload.replyTo,
      };
    case GET_POST_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case GET_POST_RESET:
      return {
        ...state,
        post: null,
        replies: [],
        replyTo: null,
      };
    case CREATE_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [payload, ...state.posts],
      };
    case CREATE_POST_FAIL:
      return {
        loading: false,
        errors: payload,
      };

    case TOGGLE_POST_LIKE_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        replies: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
      };
    case TOGGLE_POST_RETWEET_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post._id !== payload),
      };
    case DELETE_POST_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case GET_POSTS_RESET:
      return {
        ...state,
        posts: [],
        pinnedPost: [],
      };
    default:
      return state;
  }
};

export const searchModeReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case TOGGLE_USERS_MODE:
      return {
        mode: "usersMode",
      };
    case TOGGLE_POSTS_MODE:
      return {
        mode: "postsMode",
      };

    default:
      return state;
  }
};
