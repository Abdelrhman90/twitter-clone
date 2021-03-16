import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Chat from "../components/Chat";
import { BiCommentAdd } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getChats } from "../redux/actions/chatActions";
import { GET_CHAT_RESET } from "../redux/types";
import Loader from "../components/Loader";
import "./ProfileScreen.css";
const InboxScreen = () => {
  const { chats, loading } = useSelector((state) => state.chats);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChats());
  }, [dispatch]);
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
              <h1>Inbox</h1>
              <Link to="/messages/new">
                <BiCommentAdd />
              </Link>
            </div>
            {loading || !chats ? (
              <Loader />
            ) : (
              <div className="resultsContainer">
                {chats.map((chat) => (
                  <Chat key={chat._id} chat={chat} />
                ))}
              </div>
            )}
          </Col>
          <Col className="d-none d-md-block col-md-2 col-lg-4"></Col>
        </Row>
      </div>
      )
    </>
  );
};

export default InboxScreen;
