import '../Styles/Screens/Calendar.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import {
	getAllDocumentsFromCollection,
} from "../firebaseQueries"
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
//import interactionPlugin from '@fullcalendar/interaction';

/**
 * Calendar component displays a week overview with events, allowing users to manage their posts.
 * If the user is signed in, it shows the calendar along with the option to create a new post.
 * If the user is not signed in, it redirects to the login page.
 */
const Calendar = () => {
	const auth = getAuth();
	const [loggedUser, isloading, error] = useAuthState(auth);
	const navigate = useNavigate();
	const [posts, setPosts] = useState([]);
	const state = {
		weekendsVisible: true,
		currentEvents: [],
	};

	useEffect(() => {
		if (isloading) return;
        if (!loggedUser) return navigate("/login");
		(async () => {
			try {
				const now = new Date();
				const oneWeekFromNow = new Date();
				oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
				const postsData = await getAllDocumentsFromCollection("posts");
				postsData.map((post) => {
					post.start = post.start.toDate();
					if(post.data !== undefined){
						post.title = Object.keys(post.data);
					} else {
						post.title = "Imediate Post";
					}
					
				});
				setPosts(postsData);
			} catch (error) {
				console.error(error);
			}
		})();
	}, [loggedUser,isloading]);
	
	const handleNewPost = async () => {
		navigate("/post");
	};


	return (
		<div className='Container'>
			<Header />
			<div className='calendarContainer'>
				<div className="titlecontainer">
					<h1 className="weektitle">Week Overview</h1>
					<button className="newPostButton" onClick={() => handleNewPost()}>
						+ New Post
					</button>
				</div>
				<div className="Calendar">
					<FullCalendar
						plugins={[timeGridPlugin]}
						initialView="timeGridWeek" /* dayGridMonth */
						slotMinTime="00:00" // Set the minimum time to 6:00 AM
						slotMaxTime="24:00" // Set the maximum time to 11:00 PM
						headerToolbar={{
							left: "prev,next",
							center: "title",
							right: "timeGridWeek,timeGridDay",
						}}
						events={posts}
						eventContent={renderEventContent}
						weekText="Week"
						allDaySlot={false}
						slotLabelFormat={{
							hour: "2-digit",
							minute: "2-digit",
							//hour12: false, // This sets the time format to 24-hour clock
						}}
						dayHeaderFormat={{
							weekday: "short", // Display the short name of the day of the week (e.g., "Mon")
						}}
					/>
				</div>
			</div>
			<Footer />
		</div>
	);
};

/**
 * Renders the content of an event on the calendar.
 * @param {Object} eventInfo - Information about the event.
 * @returns {JSX.Element} - JSX representing the event content.
 */
function renderEventContent(eventInfo) {
	return (
		<>
			<b>{eventInfo.timeText}</b>
			<i>{eventInfo.event.title}</i>
		</>
	)
}
export default Calendar;