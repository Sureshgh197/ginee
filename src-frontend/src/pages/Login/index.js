import React, { Component, useState } from "react";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";

import "./login.scss";
import Loginn from "./login2";

const Forms = () => {
    const [login, setlogin] = useState(0)


    return (
        < >
            <div className="login">
                <div className="appAside" />
                <div className="appForm">
                    <div className="pageSwitcher">
                        <div activeclassname="pageSwitcherItem-active" className="pageSwitcherItem" onClick={() => setlogin(0)} >
                            Sign In
                        </div>
                        <div activeclassname="pageSwitcherItem-active" className="pageSwitcherItem" onClick={() => setlogin(1)}>
                            Sign Up
                        </div>
                    </div>

                    {/* <div className="formTitle">
              <NavLink
                to="/sign-in"
                activeClassName="formTitleLink-active"
                className="formTitleLink"
              >
                Sign In
              </NavLink>{" "}
              or{" "}
              <NavLink
                exact
                to="/"
                activeClassName="formTitleLink-active"
                className="formTitleLink"
              >
                Sign Up
              </NavLink>
            </div> */}
                    <div style={login == 0 ? { display: 'block' } : { display: 'none' }} >
                        <Login handleclick={() => setlogin(1)} />

                    </div>
                    <div style={login == 1 ? { display: 'block' } : { display: 'none' }} >
                        <Signup handleclick={() => setlogin(0)} />

                    </div>
                </div>
            </div>
        </>
    );

}

export default Forms;



