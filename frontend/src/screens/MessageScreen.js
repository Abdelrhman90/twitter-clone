import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/actions/userActions";
import User from "../components/User";
import { GET_SEARCH_USERS_RESET } from "../redux/types";
import { createGroupChat } from "../redux/actions/chatActions";
import "./ProfileScreen.css";
const MessagesScreen = ({ history }) => {
  const [timer, setTimer] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  let [value, setValue] = useState("");
  const { users } = useSelector((state) => state.searchUsers);
  const { success, groupChat } = useSelector((state) => state.chat);
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    clearTimeout(timer);
    if (value === "" && e.keyCode === 8) {
      selectedUsers.pop();
      dispatch({ type: GET_SEARCH_USERS_RESET });
    }
    setTimer(
      setTimeout(() => {
        value = e.target.value;
        if (value === "") {
          dispatch({ type: GET_SEARCH_USERS_RESET });
        } else {
          dispatch(getUsers(value));
        }
      }, 1000)
    );
  };

  const handleUserClick = (user) => {
    setValue("");
    setSelectedUsers((prevState) => [...prevState, user]);
    dispatch({ type: GET_SEARCH_USERS_RESET });
  };

  const handleButtonClick = () => {
    dispatch(createGroupChat(selectedUsers));
  };

  useEffect(() => {
    if (success) {
      history.push(`/messages/${groupChat._id}`);
    }
  }, [success, history]);

  return (
    <>
      <div className="wrapper">
        <Row>
          <Col xs={2}>
            <nav>
              <Sidebar />
            </nav>
          </Col>
          <Col xs={10} md={8} lg={6} className="mainSectionContainer">
            <div className="titleContainer">
              <h1>Messages</h1>
            </div>
            <div className="chatPageContainer">
              <div className="chatTitleBar">
                <label htmlFor="userSearchTextbox">To:</label>
                <div className="selectedUsers">
                  {selectedUsers.map((user) => {
                    const name = `${user.firstName} ${user.lastName}`;
                    return <span className="selectedUser">{name}</span>;
                  })}
                  <input
                    type="text"
                    id="userSearchTextbox"
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleChange}
                    placeholder="Type the name of the person"
                    autoComplete="off"
                    value={value}
                  />
                </div>
              </div>
              <div className="resultsContainer">
                {users &&
                  value &&
                  users.map((user) => {
                    if (
                      user._id === userInfo.user._id ||
                      selectedUsers.some((u) => user._id === u._id)
                    ) {
                      return;
                    }
                    return (
                      <User
                        key={user._id}
                        profile={user}
                        clickHandler={handleUserClick.bind(this, user)}
                      />
                    );
                  })}
              </div>
              <button
                disabled={selectedUsers.length === 0}
                className="createChatButton"
                onClick={handleButtonClick}
              >
                Create chat
              </button>
            </div>
          </Col>
          <Col className="d-none d-md-block col-md-2 col-lg-4"></Col>
        </Row>
      </div>
      )
    </>
  );
};

export default MessagesScreen;
