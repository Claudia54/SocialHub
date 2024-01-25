import "../Styles/Components/Headers.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { LandingData } from './LandingData';

/**
 * React component for the landing page header.
 *
 * @returns {JSX.Element} - The JSX element representing the LandingHeader component.
 */
const LandingHeader = () => {
  const navigate = useNavigate();
  
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);


  return (
    <>
      <div className="StyledHeader" style={{backgroundColor: "var(--bluecolor5)"}}>
        <Link to={"/"}>
          <img
            src={process.env.PUBLIC_URL + "/logo_s_fundo_branco.png"}
            width="120"
          />
        </Link>

        <div className="NavManu" >
          <li>
            <Link to={"/about"} className="nav-menu-item">
                About Us
            </Link>
          </li>
          <li>
            <Link to={"/contacts"} className="nav-menu-item">
                Contacts
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

              {LandingData.map((item, index) => {
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
              
                <div className="login">
				        	<Link to={"/calendar"} className="login-link">
				        		Sign In
				        	</Link>
				        </div>
              </div>
            </ul>
          </nav>
          <div className="login">
					  <Link to={"/calendar"} className="login-link">
					  	Sign In
					  </Link>
		      </div>
        </div>
      </div>
      
    </>
  );
};

export default LandingHeader;
