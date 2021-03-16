import { combineReducers, applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userRegisterReducer,
  userLoginReducer,
  searchUsersReducer,
} from "./reducers/userReducer";
import { profileReducer } from "./reducers/profileReducers";
import { postReducer, searchModeReducer } from "./reducers/postReducers";
import {
  chatReducer,
  chatsReducer,
  socketReducer,
} from "./reducers/chatReducer";
import { messagesReducer } from "./reducers/messagesReducer";
const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  post: postReducer,
  profile: profileReducer,
  searchMode: searchModeReducer,
  searchUsers: searchUsersReducer,
  chat: chatReducer,
  chats: chatsReducer,
  message: messagesReducer,
  socket: socketReducer,
});

const userInfoFromLocal = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {};

const initialState = {
  userLogin: { userInfo: userInfoFromLocal },
};

const middlewares = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
