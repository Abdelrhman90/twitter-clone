import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { IsUserRedirect, ProtectedRoute } from "./routes/authRoutes";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import PostScreen from "./screens/PostScreen";
import ProfileScreen from "./screens/ProfileScreen";
import FollowingScreen from "./screens/FollowingScreen";
import SearchScreen from "./screens/SearchScreen";
import InboxScreen from "./screens/InboxScreen";
import ChatScreen from "./screens/ChatScreen";
import { useSelector, useDispatch } from "react-redux";
import { setupSocket } from "./redux/actions/userActions";
import MessagesScreen from "./screens/MessageScreen";
import "./app.css";
const App = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  useEffect(() => {
    dispatch(setupSocket());
  }, [dispatch]);

  return (
    <>
      <Router>
        <div className="auth-wrapper">
          <IsUserRedirect
            user={userInfo && userInfo.user}
            loggedInPath="/"
            path="/login"
          >
            <LoginScreen />
          </IsUserRedirect>
          <IsUserRedirect
            user={userInfo && userInfo.user}
            loggedInPath="/"
            path="/register"
          >
            <SignupScreen />
          </IsUserRedirect>
        </div>

        <ProtectedRoute
          user={userInfo && userInfo.user}
          path="/"
          component={HomeScreen}
          exact
        />
        <ProtectedRoute
          user={userInfo && userInfo.user}
          path="/posts/:id"
          component={PostScreen}
          exact
        />
        <ProtectedRoute
          user={userInfo && userInfo.user}
          path="/profile"
          component={ProfileScreen}
          exact
        />
        <ProtectedRoute
          user={userInfo && userInfo.user}
          path="/profile/:username"
          component={ProfileScreen}
          exact
        />
        <ProtectedRoute
          user={userInfo && userInfo.user}
          path="/profile/:userId/following"
          component={FollowingScreen}
          exact
        />
        <ProtectedRoute
          user={userInfo && userInfo.user}
          path="/search"
          component={SearchScreen}
          exact
        />
        <Switch>
          <ProtectedRoute
            user={userInfo && userInfo.user}
            path="/messages"
            component={InboxScreen}
            exact
          />
          <ProtectedRoute
            user={userInfo && userInfo.user}
            path="/messages/new"
            component={MessagesScreen}
            exact
          />
          <ProtectedRoute
            user={userInfo && userInfo.user}
            path="/messages/:id"
            component={ChatScreen}
            exact
          />
        </Switch>
      </Router>
    </>
  );
};

export default App;
