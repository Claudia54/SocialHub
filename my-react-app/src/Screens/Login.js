import "../Styles/Screens/Login.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	getAllDocumentsFromCollection,
} from "../firebaseQueries"
import { auth } from "../firebase.config";
import { signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import CryptoJS from 'crypto-js';
import { secretKey } from "../secretKey";
import { setToCache } from "../Utils/AppCache";

import Footer from "../Components/Footer";

/**
 * React component for the login screen.
 *
 * @param {boolean} isScrolled - Boolean indicating whether the page is scrolled.
 * @returns {JSX.Element} - The JSX element representing the Login component.
 */
const Login = (isScrolled) => {
	const [email, setEmail] = useState("admin@socialhub.pt");
	const [password, setPassword] = useState("AdminSH");
	const navigate = useNavigate();


	/**
     * Handles the change in the email input field.
     * @param {Object} e - Event object.
     */
	const handleEmail = (e) => {
		setEmail(e.target.value);
	};


	/**
     * Handles the change in the password input field.
     * @param {Object} e - Event object.
     */
	const handlePass = (e) => {
		setPassword(e.target.value);
	};


	/**
     * Encrypts data using AES encryption.
     * @param {Object} data - Data to be encrypted.
     * @param {string} secretKey - Secret key for encryption.
     * @returns {string} - Encrypted data.
     */
	const encryptData = (data, secretKey) => {
		const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
		return encryptedData;
	};


	 /**
     * Handles the login button click.
     */
	const handleClickLogin = async () => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const userDoc = (await getAllDocumentsFromCollection("users")).find(user => user.email === email);
			if(userDoc) {
				const encryptedPassword = encryptData({"password": password}, secretKey);
				setToCache("password", encryptedPassword);
				navigate("/calendar");
			}
			else{
				const auth = getAuth();
				await signOut(auth)
				throw "Firebase: Error (auth/user-not-found).";
			}	

			let sessionTimeout = null;
			auth.currentUser.getIdTokenResult().then((idTokenResult) => {
				// Make sure all the times are in milliseconds!
				const authTime = idTokenResult.claims.auth_time * 1000;
				const sessionDuration = 1000 * 60 * 60 * 25;
				const millisecondsUntilExpiration = sessionDuration - (Date.now() - authTime);
				sessionTimeout = setTimeout(() => {auth.signOut(); console.log('Session timed out. Please enter credentials again.')}, millisecondsUntilExpiration);
				
			});
		} catch (error) {
			console.log("Something went wrong!");
			switch (error.message) {
				case "Firebase: Error (auth/user-not-found).":
					{
						console.log("It seems that such a user does not exist");
					}
					break;
				case "Firebase: Error (auth/wrong-password).":
					{
						console.log("You have entered an incorrect password");
					}
					break;
				default:
					{
						console.log(`${error.message}`);
					}
					navigate("/error");
			}
		}
		
	};


	/**
     * Handles the "Forgot Password" link click.
     */
	const handleForgotPass = async () => {
		navigate("/forgotpass");
	};

	return (
		<div className="Container">
			<div className="Login">
				<div className={"Logocontainer"}>
					<img
						src={process.env.PUBLIC_URL + "/logo_s_fundo_branco.png"}
						alt="Logo"
						width="300"
					/>
				</div>
				<div className={"container"}>
					<input
						value={email}
						placeholder="Enter your email here"
						className={"Box"}
						onChange={(e) => handleEmail(e)}
					/>
					{/* <label className ="ErrorLabel">{emailError}</label>  */}
				</div>
				<div className={"container"}>
					<input
						value={password}
						type="password"
						placeholder="Enter your password here"
						className={"Box"}
						onChange={(e) => handlePass(e)}
					/>
				</div>
				<div className={"container"}>
					<input
						className={"button"}
						type="button"
						onClick={() => handleClickLogin()}
						value={"Login"}
					/>
					<a className="forgot-link" onClick={() => handleForgotPass()}>
						Forgot Password
					</a>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Login;
