import React from "react";
import '../Styles/Screens/ErrorPage.css';

/**
 * ErrorPage component represents the page displayed when a user navigates to an undefined route.
 * It shows a 404 error image to indicate that the requested page is not found.
 */
const ErrorPage = () => {
    return (
        <div className="error">
        <div className="errorcontainer">
            <img className="errorimg"
                src={process.env.PUBLIC_URL + "/404-cartoon.png"}
                alt="404 Page Not Found"
            />
            <img className="errorimg"
                src={process.env.PUBLIC_URL + "/404.png"}
                alt="404 Page Not Found"
            />
        </div>
        </div>
        );
    };
    
export default ErrorPage;