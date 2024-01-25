import React from "react";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom"
import LandingHeader from "../Components/LandingHeader";
import "../Styles/Screens/LandingPage.css";

/**
 * React component for the About page, providing information about the application's functionalities.
 *
 * @returns {JSX.Element} - The JSX element representing the About component.
 */
const About = () => {
	return (
		<>
            <LandingHeader/>
            {/*  FUNCTIONALITIES SECTION  */}

			<section className="section4">
				<text className="section4-title">
					A New Way of Scheduling Content
				</text>
				<div className="section4-functions">
					<div className="section4-func-img">
						<img className="section4-img-left"
							src={process.env.PUBLIC_URL + "/calendar.png"}
						/>
					</div>
					<div className="section4-func-text">
						<text className="section4-text-right">
							Calendar View
						</text>
						<text margin="0px 0px 0px 0px">
							A calendar view to help you and your team visualize all your programmed content. Stay organized and become more productive while improving your social accounts engagement.
						</text>
					</div>
				</div>
				<div className="section4-functions">
					<div className="section4-func-text">
						<text className="section4-text-left">
							Post Creation
						</text>
						<text margin="0px 0px 0px 0px">
							Easily create posts for different social networks and select more than one social account to post to. Simplify your work and automate the tedious work of having to post to multiple accounts one at the time.
						</text>
					</div>
					<div className="section4-func-img">
						<img className="section4-img-right"
                            src={process.env.PUBLIC_URL + "/postsCreation.png"}
						/>
					</div>
				</div>
                <div className="section4-functions">
					<div className="section4-func-img">
						<img className="section4-img-left"
							src={process.env.PUBLIC_URL + "/TeamManagement.png"}
						/>
					</div>
					<div className="section4-func-text">
						<text className="section4-text-right">
                            Team Management
						</text>
						<text margin="0px 0px 0px 0px">
                            Manage your team, allowing them to post to your company's social accounts. Add and remove team members as you please, improving your workflow.
						</text>
					</div>
				</div>
				<div className="section4-functions">
					<div className="section4-func-text">
						<text className="section4-text-left">
                            Accounts Management
						</text>
						<text margin="0px 0px 0px 0px">
                        View all your social network accounts, remove and add new ones, and manage all accounts accessibility. Renew accessibility tokens to allow your team to publish content.
						</text>
					</div>
					<div className="section4-func-img">
						<img className="section4-img-right"
                            src={process.env.PUBLIC_URL + "/accountsManagement.jpg"}
						/>
					</div>
				</div>

			</section>
			<Footer/>
		</>
	);
};



export default About;