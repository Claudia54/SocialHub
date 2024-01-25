import React from "react";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom"
import LandingHeader from "../Components/LandingHeader";
import "../Styles/Screens/LandingPage.css";


/**
 * LandingPage component represents the landing page of the application.
 * It includes sections for introducing the Social Hub, integrated social networks,
 * and showcasing the team members.
 */
const LandingPage = () => {
	return (
		<>
			<LandingHeader/>
			<section className="section1">
				<div className="section1-text">
					<text className="section1-title">
						Social Hub
					</text>
					<text className="section1-subtitle">
						Easily plan all your content
					</text>
				</div>
				<div className="section1-imgbox">
					<img className="section1-img"
						src={process.env.PUBLIC_URL + "/social-media.png"}/>
				</div>
			</section>
		
{/*  SOCIAL NETWORKS SECTION  */}

			<section className="section2">
				<div className="section2-box">
					<text className="section2-title">Integrated Socials</text>
					<section className="section2-apps">
						<div className="section2-app">
							<img src={process.env.PUBLIC_URL + "/reddit.png"}/>
							<text>
								Reddit
							</text>
						</div>
						<div className="section2-app">
							<img src={process.env.PUBLIC_URL + "/discord.png"}/>
							<text>
								Discord
							</text>
						</div>
						<div className="section2-app">
							<img src={process.env.PUBLIC_URL + "/slack.png"}/>
							<text>
								Slack
							</text>
						</div>
					</section>
					<hr className="section2-hr1"/>
				</div>
				<hr className="section2-hr2"/>
			</section>

{/*  TEAM SECTION  */}

			<section className="section3">
				<div className="section2-box">
					<text className="section2-title">The Team</text>
					<hr className="section2-hr2"/>
				</div>
				<div className="section3-team">	
					<div className="section3-members">
						<img
							className="section3-pic"
							src={process.env.PUBLIC_URL + "/pomeranian.png"}
						/>
						<text className="section3-text">
							Cláudia S.
						</text>
					</div>
					<div className="section3-members">
						<img
							className="section3-pic"
							src={process.env.PUBLIC_URL + "/beagle.png"}
						/>
						<text className="section3-text">
							Francisco P.
						</text>
					</div>
					<div className="section3-members">
						<img
							className="section3-pic"
							src={process.env.PUBLIC_URL + "/fox terrier.png"}
						/>
						<text className="section3-text">
							João C.
						</text>
					</div>
					<div className="section3-members">
						<img
							className="section3-pic"
							src={process.env.PUBLIC_URL + "/dashund.png"}
						/>
						<text className="section3-text">
							Laura R.
						</text>
					</div>
					<div className="section3-members">
						<img
							className="section3-pic"
							src={process.env.PUBLIC_URL + "/chi.png"}
						/>
						<text className="section3-text">
							Mariana M.
						</text>
					</div>
				</div>
				<div className="section3-team">	
					<div className="section3-members">
						<img
							className="section3-pic"
							src={process.env.PUBLIC_URL + "/corgi.png"}
						/>
						<text className="section3-text">
							Mário C.
						</text>
					</div>
					<div className="section3-members">
						<img
							className="section3-pic"
							src={process.env.PUBLIC_URL + "/shiba.png"}
						/>
						<text className="section3-text">
							Vasco M.
						</text>
					</div>
				</div>
			</section>

			<Footer/>
		</>
	);
};



export default LandingPage;