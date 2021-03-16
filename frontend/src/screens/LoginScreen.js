import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/userActions";
import Message from "../components/Message";
const LoginScreen = ({ history, location }) => {
  const [stylePath, setStylePath] = useState("LoginScreen.css");

  const dispatch = useDispatch();

  const [logUserName, setLogUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ logUserName, password }));
  };

  const { userInfo, loading, errors } = useSelector((state) => state.userLogin);
  // Adding background color for this screen only
  useEffect(() => {
    let head = document.head;
    let link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = stylePath;

    head.appendChild(link);

    return () => head.removeChild(link);
  }, [stylePath]);

  return (
    <div className="loginContainer">
      {loading && <h1>Loading...</h1>}
      {errors && <Message variant="danger">{errors}</Message>}
      <h1>Login</h1>
      <form method="post" onSubmit={handleLoginSubmit}>
        <input
          type="text"
          placeholder="Enter email or username"
          name="loginUser"
          value={logUserName}
          onChange={(e) => setLogUserName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input type="submit" value="Login" />
      </form>
      <Link to="/register">Need an account? Sign up here</Link>
    </div>
  );
};

export default LoginScreen;
