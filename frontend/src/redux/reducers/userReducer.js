import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LOGOUT,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAIL,
  GET_SEARCH_USERS_SUCCESS,
  GET_SEARCH_USERS_FAIL,
  GET_SEARCH_USERS_RESET,
} from "../types";

export const userRegisterReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: payload,
      };
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        errors: payload,
      };
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: payload,
      };
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        errors: payload,
      };
    case FOLLOW_USER_SUCCESS:
      return {
        loading: false,
        userInfo: { ...state.userInfo, user: payload },
      };
    case FOLLOW_USER_FAIL:
      return {
        loading: false,
        errors: payload,
      };

    case GET_SEARCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: payload,
      };
    case GET_SEARCH_USERS_FAIL:
      return {
        loading: false,
        errors: payload,
      };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

const initialState = {
  loading: true,
  users: [],
  errors: null,
};

export const searchUsersReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_SEARCH_USERS_SUCCESS:
      return {
        loading: false,
        users: payload,
      };
    case GET_SEARCH_USERS_FAIL:
      return {
        loading: false,
        errors: payload,
      };
    case GET_SEARCH_USERS_RESET:
      return {
        users: [],
        loading: false,
      };
    default:
      return state;
  }
};
