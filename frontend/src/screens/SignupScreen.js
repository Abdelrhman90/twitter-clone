import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/userActions";
const SignupScreen = ({ history, location }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [stylePath, setStylePath] = useState("LoginScreen.css");

  const userSelector = useSelector((state) => state.userRegister);
  let { userInfo, loading, errors } = userSelector;

  const handleSubmit = (e) => {
    setMessage("");
    e.preventDefault();
    if (password !== passwordConfirm) {
      setMessage("Passwords should match");
    } else {
      dispatch(register({ firstName, lastName, username, email, password }));
    }
  };
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

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  return (
    <div className="loginContainer">
      <h1>Signup</h1>
      {message && <Message variant="danger">{message}</Message>}
      {loading && <h1>Loading...</h1>}
      {errors && <Message variant="danger">{errors}</Message>}
      <form>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          name="firstName"
          required
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last name"
          name="lastName"
          required
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          name="userName"
          required
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          name="email"
          required
        />
        <input
          className="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          name="password"
          minLength="8"
          required
        />
        <input
          className="password"
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="Confirm password"
          name="passwordConfirm"
          minLength="8"
          required
        />
        <input type="submit" value="Register" onClick={handleSubmit} />
      </form>
      <Link to="/login">Already a user? Login here</Link>
    </div>
  );
};

export default SignupScreen;
