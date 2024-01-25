import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SocialAccountsTable from "../Components/SocialAccountsTable";
import SocialAccountsForms from "../Components/SocialAccountsForms";
import MiniCalendar from "../Components/MiniCalendar";

import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { getGroups } from '../Utils/GetCollections';
import { availableSocials } from '../Utils/Static';
import "../Styles/Screens/Post.css";

import { postDiscord } from "../Backend/Discord";
import { postReddit } from "../Backend/Reddit";
import { postSlack } from "../Backend/Slack";

import {
    getAllDocumentsFromCollectionWithUID,
    updateSpecificDocumentInCollection,
    addDocumentToCollection,
} from "../firebaseQueries";
import { getAuth } from "firebase/auth";
import {
    ref as storageRef,
    uploadBytes,
} from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { storage } from "../firebase.config";


/**
 * React component for handling and posting content to various social media platforms.
 *
 * @returns {JSX.Element} - The JSX element representing the Post component.
 */
function Post  ()  {
    const auth = getAuth();
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    
    const [forceRender, setForceRender] = useState(false);
    const [postDate, setPostDate] = useState(false);

    // Social Networks variables
    const [socialKeys,setSocialKeys] = useState([]);
    const [allSocials, setAllSocials] = useState({});
    const [groupSocials, setGroupSocials] = useState({});
    const [selectedSocials, setSelectedSocials] = useState([]);
    // Social Accounts variables
    const [listAccounts, setListAccounts] = useState({});
    const [selectedAccounts, setSelectedAccounts] = useState({});
    // Groups of Accounts variables
    const [groupKeys,setGroupKeys] = useState([]);
    const [groups, setGroups] = useState({});
    const [selectedGroups, setSelectedGroups] = useState({});
    const [selectedGroupsNames, setSelectedGroupsNames] = useState([]);

    const [groupParams, setGroupParams] = useState({});
    const [selectedDate, setSelectedDate] = useState();

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [image, setImage] = useState('');
    const [showUrlAsComment, setShowUrlAsComment] = useState(false);
    const [selectedSocialMedia, setSelectedSocialMedia] = useState([]);
    const [isToggled, setToggle] = useState(false);


    /**
     * Forces re-rendering of the component.
     */
    const handleForceRender = () => {
        setForceRender(prevState => !prevState);
    };


    /**
     * Uploads files to storage for a specific post and social media platform.
     * @param {File[]} files - Array of files to be uploaded.
     * @param {string} postId - ID of the post.
     * @param {string} social - Social media platform.
     */
    const uploadFiles = async (files, postId, social) => {
        try {
            const promises = [];

            for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const imageRef = storageRef(storage, `posts/${postId}/${social}/${file.name}`);
            const promise = uploadBytes(imageRef, new Blob([file]))
                .catch((error) => {
                console.error(error);
                });

            promises.push(promise);
            }

            // Wait for all upload promises to complete
            await Promise.all(promises);
        } catch (error) {
            console.log(error);
        }
        
    };
    
    
    /**
     * Retrieves the list of social media accounts.
     */
    const getListSocials = async () => {
        try{
            const socials = (await getAllDocumentsFromCollectionWithUID("socialAccounts"))
            setAllSocials(socials);
            for(const social in socials){
                if(!groupSocials.hasOwnProperty(socials[social].uid) && availableSocials.includes(socials[social].uid)){
                    groupSocials[socials[social].uid] = false
                    setSocialKeys(prevList => [...prevList, socials[social].uid])
                }
            }
            getListAccounts(socials)
        }
        catch (error) {
            console.error(error);
        }
    }


    /**
     * Retrieves the list of accounts for each social media platform.
     * @param {Object} socials - Object containing social media accounts.
     */
    const getListAccounts = async (socials) => {
        for(const social in socials){
            const uid = socials[social].uid;
            const data = socials[social].data
            var newsocial = []
            for(const acc in data){
                if(data[acc].hasOwnProperty("username")){
                    newsocial.push(data[acc].username)
                }
            }
            listAccounts[uid] = newsocial
        }
    }


     /**
     * Handles the selection or deselection of a social media platform.
     * @param {string} social - Social media platform.
     */
    const handlerSelectSocial = async (social) =>{
        groupSocials[social] = !groupSocials[social];
        handleForceRender()
    };


    /**
     * Handles the selection or deselection of a group of accounts.
     * @param {string} group - Group of accounts.
     */
    const handlerSelectGroup = async (group) =>{
        selectedGroupsNames[group] = !selectedGroupsNames[group];
    };
    
    
    /**
     * Handles the selection or deselection of a group of accounts.
     * @param {Object} group - Group of accounts.
     * @param {string} groupName - Name of the group.
     */
    function handleGroupToSelected(group, groupName) {
        // When group is selected, select its accounts
        for(const account in group){
            const social = group[account]['social'];
            const acc = group[account]['username'];
            if(selectedGroupsNames[groupName] && !selectedGroups.hasOwnProperty(social)){
                selectedGroups[social] = []
            }
            if(selectedGroupsNames[groupName] && selectedGroups.hasOwnProperty(social) && !selectedGroups[social].includes(acc)){
                selectedGroups[social] = [acc, ...(selectedGroups)[social]];
                
            } else if(!selectedGroupsNames[groupName] && selectedGroups.hasOwnProperty(social) && selectedGroups[social].includes(acc)){
                selectedGroups[social] = selectedGroups[social].filter(acc1 => acc1 !== acc);
            }
            groupSocials[social] = selectedGroupsNames[groupName]
            if(!selectedSocials.includes(social)){
                selectedSocials.push(social)
            }
            selectedAccounts[social] = selectedGroups[social]
            //groupParams[social] = {}
            setGroupParams(prevSet => {return { ...prevSet, [social]: {} };})
        }
    }
    
    const handleNow = async () => {
        setPostDate(false)
    };


    /**
     * Handles the selection of the current date and time for scheduling a post.
     */
    const handleSelectDate = async () =>{
        var currentdate = new Date();
        currentdate.setDate(currentdate.getDate() + 1);
        setPostDate(currentdate)
        setShow(true)
    };


     /**
     * Gathers data of selected accounts for publishing.
     * @returns {Object} - Object containing data of selected accounts.
     */
    const getSelectedAccountsData = () => {
        var dict = {}
        for(const social in allSocials){
            const social_name = allSocials[social].uid
            const social_data = allSocials[social].data
            if(selectedAccounts.hasOwnProperty(social_name)){
                const selected_social = selectedAccounts[social_name]
                if(selectedAccounts[social_name].length > 0 && !dict.hasOwnProperty(social_name)){
                    dict[social_name] = {}
                }
                for(const account in social_data){
                    const account_data = social_data[account]
                    const dict_social = dict[social_name]
                    if(selected_social.includes(account_data.username)){
                        dict_social[account_data.username] = account_data
                    }
                }
            }
        }
        return dict;
    }


     /**
     * Retrieves data for a specific account from the selected accounts.
     * @param {string} social - Social media platform.
     * @param {string} username - Username of the account.
     * @returns {Object} - Data of the specified account.
     */
    const getDataAccount = (social, username) => {
        const dict = getSelectedAccountsData();
        const social_data = dict[social]
        const username_data = social_data[username]
        return username_data;
    }


     /**
     * Handles the publication of the post to selected social media platforms.
     */
    const handlePublish = async () =>{
        const utils = await getAllDocumentsFromCollectionWithUID("utils");
        const stats = utils.find(post => post.uid === "stats").data;
        const nPosts = stats.number;
        const nPost = nPosts + 1;
        var accountsData = getSelectedAccountsData();

        try{
            if(postDate){
                if(accountsData['Discord']){
                    const discordImages = groupParams['Discord'].images;
                    if (discordImages && discordImages.length > 0) {
                        await uploadFiles(discordImages, nPost, "Discord");
                        delete groupParams["Discord"].images;
                    }
                }
                if(accountsData['Reddit']){
                    const redditImages = groupParams['Reddit'].images;
                    if (redditImages && redditImages.length > 0) {
                        await uploadFiles(redditImages, nPost, "Reddit");
                        delete groupParams["Reddit"].images;
                    }
                }
                addDocumentToCollection("posts", nPost.toString(), {
                    start: postDate,
                    title: nPost,
                    state: "Scheduled",
                    accounts: accountsData,
                    data: groupParams
                });
            }
            else{
                //Case Post Now
                var currentdate = new Date();
                addDocumentToCollection("posts", nPost.toString(), {
                    start:currentdate,
                    title:nPost,
                    state:"Published"
                });
                if(accountsData['Discord']){
                    for (const k in accountsData['Discord']){
                        if (accountsData['Discord'].hasOwnProperty(k)) {
                            const element = accountsData['Discord'][k];
                            await postDiscord(element, groupParams['Discord'].text, groupParams['Discord'].images);
                        }
                    }
                }
                if(accountsData['Reddit']){
                    for (const k in accountsData['Reddit']){
                        if (accountsData['Reddit'].hasOwnProperty(k)) {
                            const element = accountsData['Reddit'][k];
                            await postReddit(element, groupParams['Reddit'].title, groupParams['Reddit'].text, groupParams['Reddit'].images);
                        }
                    }
                }
                if(accountsData['Slack']){
                    for (const k in accountsData['Slack']){
                        if (accountsData['Slack'].hasOwnProperty(k)) {
                            const element = accountsData['Slack'][k];
                            await postSlack(element, groupParams['Slack'].text);
                        }
                    }
                }
            }
            stats.number = nPost;
            await updateSpecificDocumentInCollection("utils", "stats", stats);
            navigate("/calendar")
        } catch(e){
            console.log(e);
        }
    };

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/login");
        if(Object.keys(allSocials).length === 0){
            getListSocials();
        }
        if(Object.keys(groups).length === 0){
            getGroups(groups, setGroups, groupKeys, setGroupKeys, forceRender, handleForceRender);
        }
    }, [user, loading, allSocials, groups]);


    return(
            <div className="Container">
                <Header/>
                <div className="BigContainer"> 	
                    <div className="SocialContainer">
                        <div className="SocialCard">
                            <title>Socials</title>
                            {socialKeys.map((social, index) => (
                                <button className={(groupSocials[social]) ? "active" : ""} key={index} onClick={() => {
                                    handlerSelectSocial(social)
                                }}> {social} </button>
                            ))}
                        </div>
                        <div className="SocialCard">
					    	<title>Groups</title>
					    	{groupKeys.map((group, index) => (
                                <button className={(selectedGroupsNames[group]) ? "active" : ""} key={index} onClick={() => {
                                    handlerSelectGroup(group); 
                                    handleGroupToSelected(groups[group], group);
                                    handleForceRender();
                                }}> {group} </button>
					    	))}
                        </div> 
                    </div>

                    <div className="GroupCard">
                        <SocialAccountsTable
                            socials={groupSocials}
                            listAccounts={listAccounts}
                            selectedAccounts={selectedAccounts}
                            selectedSocials={selectedSocials}
                            setSelectedSocials={setSelectedSocials}
                            setParams={setGroupParams}
                        />                    
                    </div>
                    <div className="feedSocial">
                        <SocialAccountsForms
                            socials={selectedSocials}
                            params={groupParams}
                        />
                        <div className="BottomBar">
                            
                        <div style={{'align-content': 'center', 'display': 'flex', 'justify-content': 'flex-start'}}>
                                <button className={(postDate) ? "buttonbar" : "buttonbar activebutton"} onClick={() => handleNow()} > Now </button>
                                <button className={(postDate) ? "buttonbar activebutton" : "buttonbar"} onClick={() => handleSelectDate()} > 
                                    {selectedDate &&        
                                        <b>       
                                            {selectedDate.getDate()}/{selectedDate.getMonth()+1}/{selectedDate.getFullYear()}   {selectedDate.getHours()}:{selectedDate.getMinutes()}
                                        </b>    
                                    }
                                    {!selectedDate &&        
                                        <b>          
                                            Select date/time       
                                        </b>      
                                    }
                                </button>
                            </div>
                            <div style={{'align-content': 'center', 'display': 'flex', 'justify-content': 'flex-end'}}>
                                <button className="buttonbar activebutton" onClick={() => handlePublish()} > Publish </button>
                                {/*<button className="buttonbar activebutton" onClick={() => print()} > Print </button>
                                <button className="buttonbar activebutton" onClick={() => printparams()} > Print Params </button>*/}
                            </div>
                        </div>
                    </div>
                </div>
                {(show) ? (
                    <>
                        <MiniCalendar
                            show={show}
                            toggleShow={() => setShow(!show)}
                            selectedDate={selectedDate}
                            setSelectedDate={(newDate) => setSelectedDate(newDate)}
                            //render={(date) => setPostDate(date)}
                        />
                    </>
                    
                ) : (
                    <>
                    </>
                )}
                <Footer/>
            </div>
        );
    
};

export default Post;