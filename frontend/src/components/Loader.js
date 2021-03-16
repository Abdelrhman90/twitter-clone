import React from "react";
import { Spinner } from "react-bootstrap";
const Loader = () => {
  return (
    <div className="loader">
      <Spinner animation="grow" variant="info" />;
    </div>
  );
};

export default Loader;
