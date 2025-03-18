import React from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

import Sidebar from "./Sidebar";

const Container = ({ children, className = "" }) => (
  <div className="flex h-screen w-full">
    <Sidebar />
    <div className={classnames("w-full pl-8", [className])}>{children}</div>
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
