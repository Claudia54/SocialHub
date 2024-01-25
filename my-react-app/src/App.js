import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Screens/Login";
import Calendar from "./Screens/Calendar";
import Post from "./Screens/Post";
import ForgotPass from "./Screens/ForgotPass";
import Users from './Screens/Users';
import Accounts from './Screens/Accounts';
import Groups from './Screens/Groups';
import ErrorPage from './Screens/ErrorPage';
import LandingPage from './Screens/LandingPage';
import About from './Screens/About';
import Contacts from './Screens/Contacts';

/**
 * Main component representing the structure of the application.
 * 
 * Uses React Router to define routes and components for different pages.
 * 
 * @returns {JSX.Element} - The JSX element representing the entire application structure.
 */

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<LandingPage />} />
					<Route exact path="/about" element={<About />} />
					<Route exact path="/contacts" element={<Contacts />} />
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/accounts" element={<Accounts/>} />
					<Route exact path="/calendar" element={<Calendar />} />
					<Route exact path="/post" element={<Post />} />
					<Route exact path="/forgotpass" element={<ForgotPass />} />
					<Route exact path="/users" element={<Users />} />
					<Route exact path="/groups" element={<Groups />} />

					<Route exact path="/*" element={<ErrorPage />} />
				</Routes>

			</BrowserRouter>
			{/*<ReactQueryDevtools/>*/}
		</>
	);
}

export default App;
