import '../Styles/Screens/Login.css';
import '../Styles/Screens/ForgotPass.css'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase.config"
import { sendPasswordResetEmail } from "firebase/auth";

import Footer from "../Components/Footer";
import Header from "../Components/Header";


/**
 * ForgotPass component represents the page where users can reset their passwords if forgotten.
 * It allows users to enter their email and receive instructions to reset their password.
 * Users can also navigate back to the login page.
 * @param {boolean} isScrolled - Indicates whether the page is scrolled.
 */
const ForgotPass = (isScrolled) => {
    const [email, setEmail] = useState("");

    const navigate = useNavigate()

    
    /**
     * Handles the change in the email input field.
     * @param {Object} e - The event object.
     */
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };


    /**
     * Handles the navigation back to the login page.
     */
    const handleLogIn = async () =>{
        navigate("/login")

    };

    
    /**
     * Handles the reset password process.
     * Sends a password reset email to the provided email address.
     * Navigates back to the login page after sending the email.
     * Displays appropriate error messages for different scenarios.
     * @param {Object} e - The event object.
     */
    const handleResetPassword = (e) => {
        sendPasswordResetEmail(auth, email)
          .then(() => {
            navigate("/login");
            //setMessage(
            //  `We have already sent you a letter with instructions. Please open your mail and follow all the steps indicated there. If the email has not arrived, try again in a few minutes`
            //);
          })
          .catch((error) => {
            switch (error.message) {
              case "Firebase: Error (auth/user-not-found).":
                {
                  console.log("It seems that such a user does not exist");
                }
                break;
              case "Firebase: Error (auth/too-many-requests).":
                {
                  console.log("Too many requests, try again later");
                }
                break;
              default: {
                console.log(`${error.message}`);
              }
            }
          });
      };


    return(
        
          <div className="ForgotPass">
          <div className="Login">
            <div className={"Logocontainer"}>
            <img src={process.env.PUBLIC_URL + '/logo_s_fundo_branco.png'} alt="Logo" width='300'  />
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
                    className={"button"}
                    type="button"
                    onClick = {() => handleResetPassword()}
                    value={"Reset Password"} 
                />
                <a className="forgot-link" onClick={() => handleLogIn()}>Remember your password?</a>
            </div>
          
          </div>
      
          <Footer/>
          </div>
      
      );
};



export default ForgotPass;