import "../Styles/Components/Headers.css";
import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase.config";
import { signOut } from "firebase/auth";

import { AiOutlineClose } from "react-icons/ai";
import { FaBars } from "react-icons/fa";

import { SidebarData } from './SidebarData';

/**
 * Header component for the application.
 *
 * @returns {JSX.Element} - The JSX element representing the Header component.
 */
const Header = () => {
  const navigate = useNavigate();
  
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  
  const handleLogOut = () => {
    signOut(auth);
    navigate("/login");
  };

  return (
    <>
      <div className="StyledHeader">
        <Link to={"/"}>
          <img
            src={process.env.PUBLIC_URL + "/logo_s_fundo_branco.png"}
            width="120"
          />
        </Link>

        <div className="NavManu" >
          <li>
            <Link to={"/calendar"} className="nav-menu-item">
              Posts
            </Link>
          </li>
          <li>
            <Link to={"/users"} className="nav-menu-item">
              Users
            </Link>
          </li>
          <li>
            <Link to={"/accounts"} className="nav-menu-item">
              Accounts
            </Link>
          </li>
          <li>
            <Link to={"/groups"} className="nav-menu-item">
              Groups
            </Link>
          </li>
        </div>

        <div className="icons">

          <FaBars className="menuToggleBtn" onClick={showSidebar}/>

          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <AiOutlineClose size={30}/>
                </Link>
              </li>

              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}

              <div className="sidebar-icons">
              
                <div className="logout2">
                  <img
                    onClick={() => handleLogOut()}
                    src={process.env.PUBLIC_URL + "/logout.png"}
                    width="25px"
                  />
                </div>
              </div>
            </ul>
          </nav>






          {/*<div className="logout">
            <img
              src={process.env.PUBLIC_URL + "/notification.png"}
              width="30"
            />
          </div>*/}

          <div className="logout">
            <img
              onClick={() => handleLogOut()}
              src={process.env.PUBLIC_URL + "/logout.png"}
              width="25px"
            />
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Header;
