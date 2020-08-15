import React from "react";
import Navbar from "./Navbar";

const Layout = (props) => {
  return (
    <>
      <Navbar></Navbar>
      <main className="container mx-auto">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div>{props.children}</div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
