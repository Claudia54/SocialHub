import '../Styles/Components/Footer.css';
import React from "react";
import {
  FaFacebookSquare,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";

/**
 * Footer component containing links and information.
 *
 * @returns {JSX.Element} - The JSX element representing the Footer component.
 */
const Footer = () => {

  return (
    <div className='footer'>
        <div className='sb_footer section_padding'>
            <div className='sb_footer-links'>
                <div className='sb_footer-links_div'>
                    <h4>Links</h4>
                    <a href='/post'>
                        <p>Posts</p>
                    </a>
                    <a href='/users'>
                        <p>Users</p>
                    </a>
                    <a href='/accounts'>
                        <p>Accounts</p>
                    </a>
                    <a href='/groups'>
                        <p>Groups</p>
                    </a>
                </div>
                <div className='sb_footer-links_div'>
                    <h4>About Us</h4>
                    <a href='/about'>
                        <p>About</p>
                    </a>
                    <a href='/contacts'>
                        <p>Contacts</p>
                    </a>
                </div>
                <div className='sb_footer-links_div'>
                    <h4>Coming Soon</h4>
                    <div className='socialmedia'>
                        <FaFacebookSquare size={25} />
                        <FaInstagram size={25} />
                        <FaTwitterSquare size={25} />
                    </div>
                </div>
            </div>

            <div className='sb_footer-below'>
                <div className='sb_footer-copyright'>
                    <p>
                        @{new Date().getFullYear()} Minho University. All rights reserved.
                    </p>
                </div>
            </div>

        </div>
    </div>
);
};


export default Footer;