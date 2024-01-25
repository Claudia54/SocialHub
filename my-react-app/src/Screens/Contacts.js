import React from "react";
import Footer from "../Components/Footer";
import LandingHeader from "../Components/LandingHeader";
import "../Styles/Screens/LandingPage.css";

/**
 * Contacts component represents the page displaying contact information.
 * It includes an image and contact details such as email address.
 */
const Contacts = () => {
	return (
		<div className="Container">
            <LandingHeader/>

			<section className="section5">
				<img className="section5-img"
					src={process.env.PUBLIC_URL + "/contactUs.jpg"}
				/>
				<div className="section5-contacts-text">
					<text className="section4-text-left">
						Contact Us
					</text>
					<text className="section5-text">
						Email: antisocialhub1@gmail.com
					</text>
				</div>
			</section>
			<Footer/>
		</div>
	);
};



export default Contacts;