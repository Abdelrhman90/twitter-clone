import {
  GET_PROFILE_FAIL,
  GET_PROFILE_RESET,
  GET_PROFILE_SUCCESS,
  GET_USER_FOLLOWING_SUCCESS,
  GET_USER_FOLLOWING_FAIL,
  GET_USER_FOLLOWING_REQUEST,
  GET_USER_FOLLOWERS_REQUEST,
  GET_USER_FOLLOWERS_SUCCESS,
  GET_USER_FOLLOWERS_FAIL,
} from "../types";

const initialState = {
  profile: {},
  loading: true,
  errors: null,
  loadingFollowing: true,
};

export const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: payload,
      };

    case GET_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };

    case GET_USER_FOLLOWING_SUCCESS:
      return {
        ...state,
        loadingFollowing: false,
        profile: payload,
      };
    case GET_USER_FOLLOWING_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case GET_USER_FOLLOWING_REQUEST:
      return {
        ...state,
        loadingFollowing: true,
      };
    case GET_USER_FOLLOWERS_REQUEST:
      return {
        ...state,
        loadingFollowing: true,
      };
    case GET_USER_FOLLOWERS_SUCCESS:
      return {
        ...state,
        loadingFollowing: false,
        profile: payload,
        loading: false,
      };
    case GET_USER_FOLLOWERS_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case GET_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};
