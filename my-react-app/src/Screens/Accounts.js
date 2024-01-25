import "../Styles/Screens/Accounts.css";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
	getSpecificDocumentFromCollection,
	getAllDocumentsFromCollectionWithUID,
	deleteSpecificDocumentFromCollection,
	updateSpecificDocumentInCollection,
	addDocumentToCollection
} from "../firebaseQueries"
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.config";

import Footer from "../Components/Footer";
import Header from "../Components/Header";
import AddToken from "../Components/AddToken";

import { 
	FacebookString,
	InstagramString,
	RedditString,
	TwitterString,
	WhatsAppString,
	SlackString,
	DiscordString,
	availableSocials
} from '../Utils/Static';

import { getUser } from '../Utils/GetCollections';

import FacebookTable from '../Components/Socials/TokensTable/FacebookTable';
import InstagramTable from '../Components/Socials/TokensTable/InstagramTable';
import RedditTable from '../Components/Socials/TokensTable/RedditTable';
import TwitterTable from '../Components/Socials/TokensTable/TwitterTable';
import WhatsAppTable from '../Components/Socials/TokensTable/WhatsAppTable';
import SlackTable from "../Components/Socials/TokensTable/SlackTable";
import DiscordTable from "../Components/Socials/TokensTable/DiscordTable";

/**
 * React component for managing and displaying social media accounts and tokens.
 *
 * @returns {JSX.Element} - The JSX element representing the Accounts component.
 */
const Accounts = () => {
	const auth = getAuth();
	const [user, isloading, error] = useAuthState(auth);
	const navigate = useNavigate();
    var [userAdmin, setUserAdmin] = useState(false);
	
	const [socialKeys,setSocialKeys] = useState([]);
	const [tokens, setTokens] = useState({});
	const [selectedDropdown, setSelectedDropdown] = useState(availableSocials[0]);
	const [forceRender, setForceRender] = useState(false);
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(true);

	/**
	 * Handles the change of the selected dropdown value.
	 * @param {Object} event - The event object.
	 */
	const handleDropdownChange = (event) => {
		setSelectedDropdown(event.target.value);
	};


	/**
	 * Forces a re-render of the component.
	 */
	const handleForceRender = () => {
        setForceRender(prevState => !prevState);
    };


	/**
	 * Forces a hard refresh of the page.
	 */
	const handleHardRefresh = () => {
		const randomQueryParam = `?${Math.random()}`;
		window.location.href = window.location.pathname + randomQueryParam;
	};


	/**
	 * Fetches social media accounts and updates the state.
	 */
	const getSocialsAccounts = async () => {
		const socials = (await getAllDocumentsFromCollectionWithUID("socialAccounts"))
		for(const social in socials){
			if(!tokens.hasOwnProperty(socials[social].uid) && availableSocials.includes(socials[social].uid)){
				tokens[socials[social].uid] = {}
			}
			const uid = socials[social].uid;
			const data = socials[social].data
			var newsocial = {}
			var num = 0
			for(const acc in data){
				newsocial[num] = data[acc]
				num+=1
			}
			tokens[uid] = newsocial
			if(!socialKeys.includes(uid)  && availableSocials.includes(socials[social].uid)){
				socialKeys.push(uid)
			}
		}
		setLoading(false);
	}


	/**
	 * Updates the token for a specific social media account.
	 * @param {string} socialString - The string representing the social media platform.
	 * @param {string} selectedAccount - The selected account to update.
	 * @param {Array} newToken - The new token information.
	 */
	const updateTokens = async (socialString, selectedAccount, newToken) => {
		const socialDict = tokens[socialString];
		var newSocialDict = {}
		for(const accNum in socialDict){
			const accDict = socialDict[accNum]
			if(accNum == selectedAccount){
				if(socialString == FacebookString || socialString == InstagramString || socialString == TwitterString){
					newSocialDict[accNum] = {
						token:newToken[0],
						username:accDict.username
					}
				}
				else if(socialString == DiscordString || socialString == SlackString){
					newSocialDict[accNum] = {
						url:newToken[0],
						username:accDict.username
					}
				}
				else if(socialString == RedditString){
					newSocialDict[accNum] = {
						client_id:newToken[0],
						client_secret:newToken[1],
						community:accDict.community,
						password:accDict.password,
						user_agent:accDict.user_agent,
						username:accDict.username
					}
				}
			}
			else{
				newSocialDict[accNum] = accDict
			}
		}
		updateSpecificDocumentInCollection("socialAccounts", socialString, newSocialDict)
		//await getSocialsAccounts()
		handleHardRefresh()
	}


	/**
	 * Renders the table for the selected social media platform.
	 * @param {string} selected - The selected social media platform.
	 * @returns {JSX.Element} - The JSX element representing the table.
	 */
	const renderTable = (selected) => {
		const accounts = tokens[selected];
		
		return(
			(selected === FacebookString) ? (
				<FacebookTable 
					admin={userAdmin}
					accounts={accounts}
					tokens={tokens}
					deleteToken={(social, token) => deleteToken(social, token)}
					updateToken={(FacebookString, selectedAccount, newToken) => updateTokens(FacebookString, selectedAccount, newToken)}
				/>
			) : (selected === InstagramString) ? (
				<InstagramTable 
					admin={userAdmin}
					accounts={accounts}
					tokens={tokens}
					deleteToken={(social, token) => deleteToken(social, token)}
					updateToken={(InstagramString, selectedAccount, newToken) => updateTokens(InstagramString, selectedAccount, newToken)}
				/>
			) : (selected === RedditString) ? (
				<RedditTable
					admin={userAdmin}
					accounts={accounts}
					tokens={tokens}
					deleteToken={(social, token) => deleteToken(social, token)}
					updateToken={(RedditString, selectedAccount, newToken) => updateTokens(RedditString, selectedAccount, newToken)}
				/>
			) : (selected === WhatsAppString) ? (
				<WhatsAppTable
					admin={userAdmin}
					accounts={accounts}
					tokens={tokens}
					deleteToken={(social, token) => deleteToken(social, token)}
					updateToken={(WhatsAppString, selectedAccount, newToken) => updateTokens(WhatsAppString, selectedAccount, newToken)}
				/>
			) : (selected === SlackString) ? (
				<SlackTable
					admin={userAdmin}
					accounts={accounts}
					tokens={tokens}
					deleteToken={(social, token) => deleteToken(social, token)}
					updateToken={(SlackString, selectedAccount, newToken) => updateTokens(SlackString, selectedAccount, newToken)}
				/>
			) : (selected === DiscordString) ? (
				<DiscordTable
					admin={userAdmin}
					accounts={accounts}
					tokens={tokens}
					deleteToken={(social, token) => deleteToken(social, token)}
					updateToken={(DiscordString, selectedAccount, newToken) => updateTokens(DiscordString, selectedAccount, newToken)}
				/>
			) : (
				<>
					No Social Selected
				</>
			)
		)
	};


	/**
	 * Deletes a token for a specific social media account.
	 * @param {string} social - The string representing the social media platform.
	 * @param {Object} account - The account object to delete.
	 */
	const deleteToken = async (social, account) => {
        var socials = await getSpecificDocumentFromCollection("socialAccounts", social)
        const novoObjeto = Object.fromEntries(
            Object.entries(socials).filter(([key, value]) => 
			value.username !== account.username || 
			value.client_id !== account.client_id || 
			value.client_secret !== account.client_secret || 
			value.community !== account.community || 
			value.user_agent !== account.user_agent )
		);
        await deleteSpecificDocumentFromCollection("socialAccounts", social)
        await addDocumentToCollection("socialAccounts",social, novoObjeto)
		const groups = (await getAllDocumentsFromCollectionWithUID("groups"))
		for(const group in groups){
			const groupDict = groups[group].data
			const groupName = groups[group].uid
			var newGroup = {}
			var flag = false
			for(const acc in groupDict){
				const conta = groupDict[acc]
				if(conta.social == social && conta.username == account.username){
					flag = true
					continue
				}
				if(flag){
					newGroup[acc-1] = conta
				}
				else{
					newGroup[acc] = conta
				}
			}
			if(flag){
				await addDocumentToCollection("groups", groupName, newGroup);
			}
		}
		handleHardRefresh()
    }


	/**
	 * Adds a new token for a specific social media platform.
	 * @param {string} socialString - The string representing the social media platform.
	 * @param {Array} params - The parameters for the new token.
	 */
	const addToken = async (socialString, params) => {
		var changed = tokens[socialString]
		//Podemos introduzir passos de validação para não permitir dois usernames iguais
		changed[Object.keys(tokens[socialString]).length] = params
		updateSpecificDocumentInCollection("socialAccounts", socialString, changed)
		await getSocialsAccounts()
		//handleHardRefresh()
	}

	/*if(Object.keys(tokens).length === 0){
		getSocialsAccounts();
	}*/
	useEffect(() => {
        if (isloading) return;
        if (!user) return navigate("/login");
        if(Object.keys(tokens).length <= 0){
			getSocialsAccounts();
		}
		getUser(user, userAdmin, setUserAdmin)
    }, [user, isloading, tokens, socialKeys]);
	
	if(userAdmin){
		return (
			<div className="Container">
				<Header />
				<div className="content">
					<div className='dropdown'>
						
						<select className="selectDropdown" value={selectedDropdown} onChange={handleDropdownChange}>
		
							{socialKeys.map((social, index) => (
								<option key={social} value={social}>{social}</option>
							))}
	
						</select>
						
	
						{renderTable(selectedDropdown)}
						<AddToken 
							show={show}
							toggleShow={() => setShow(!show)}
							socials={socialKeys}
							//selected={() => getSelected()}
							addToken={(socialString, params) => addToken(socialString, params)}
						/>
						
					</div>
				</div>
				<Footer />
			</div>
		);
	} else {
		return (
			<div className="Container">
				<Header />
				<div className="content">
					<div className='dropdown'>
						
						<select className="selectDropdown" value={selectedDropdown} onChange={handleDropdownChange}>
		
							{socialKeys.map((social, index) => (
								<option key={social} value={social}>{social}</option>
							))}
	
						</select>
						{renderTable(selectedDropdown)}
					</div>
				</div>
				<Footer />
			</div>
		);
	}
	
	
};

export default Accounts;