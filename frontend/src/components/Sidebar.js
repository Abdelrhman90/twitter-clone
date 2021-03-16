import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions";
import {
  FaDove,
  FaHome,
  FaSearch,
  FaBell,
  FaEnvelope,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <Link to="/">
        <FaDove className="blue" />
      </Link>
      <Link to="/">
        <FaHome />
      </Link>
      <Link to="/search">
        <FaSearch />
      </Link>
      <Link to="/notifications">
        <FaBell />
      </Link>
      <Link to="/messages">
        <FaEnvelope />
      </Link>
      <Link to={`/profile`}>
        <FaUser />
      </Link>
      <div className="link" onClick={handleLogout}>
        <FaSignOutAlt />
      </div>
    </>
  );
};

export default Sidebar;
