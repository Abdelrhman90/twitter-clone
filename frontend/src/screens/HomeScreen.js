import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import MainLayout from "../components/MainLayout";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import "./HomeScreen.css";
const HomeScreen = ({ history }) => {
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
            <MainLayout />
          </Col>
          <Col className="d-none d-md-block col-md-2 col-lg-4"></Col>
        </Row>
      </div>
    </>
  );
};

export default HomeScreen;
