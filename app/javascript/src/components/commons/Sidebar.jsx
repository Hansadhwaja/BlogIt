import React from "react";

import { NavLink, Link } from "react-router-dom";

const Sidebar = () => (
  <div className="flex h-screen min-w-16 flex-col items-center space-y-6 border-r bg-white py-4">
    <Link
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-black"
      to="/"
    >
      <i className="ri-file-3-line text-xl text-white" />
    </Link>
    <div className="flex flex-col items-center">
      <NavLink
        exact
        activeClassName="bg-gray-200"
        className="rounded-lg px-2 py-1"
        to="/"
      >
        <i className="ri-archive-drawer-line text-xl" />
      </NavLink>
      <NavLink
        activeClassName="bg-gray-200"
        className="rounded-lg px-2 py-1"
        to="/posts/create"
      >
        <i className="ri-edit-line text-xl" />
      </NavLink>
    </div>
  </div>
);

export default Sidebar;
