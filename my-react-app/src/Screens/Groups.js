import "../Styles/Screens/Accounts.css";
import "../Styles/Screens/Groups.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import {
    addDocumentToCollection,
	deleteSpecificDocumentFromCollection
} from "../firebaseQueries";

import Footer from "../Components/Footer";
import Header from "../Components/Header";
import AddGroup from "../Components/AddGroup";
import GroupTable from '../Components/GroupTable';

import { getAccounts, getGroups, getUser } from '../Utils/GetCollections';

/**
 * Groups component represents the page where users can manage groups of accounts.
 * It allows users to view, add, edit, and delete groups along with their associated accounts.
 */
const Groups = () => {
    const navigate = useNavigate()
    const auth = getAuth();
	const [loggedUser, isloading, error] = useAuthState(auth);
    const [groups, setGroups] = useState({});
    const [groupKeys,setGroupKeys] = useState([]);
    const [accounts, setAccounts] = useState({});
    const [accountsKeys,setAccountsKeys] = useState([]);
	
	var [userAdmin, setUserAdmin] = useState(false);
	
    const [show, setShow] = useState(false);
	const [forceRender, setForceRender] = useState(false);


	 /**
     * Handles the force rendering of the component by toggling the forceRender state.
     */
    const handleForceRender = () => {
		setForceRender(prevState => !prevState);
	};


	/**
     * Changes the name and accounts of a group.
     * @param {string} oldGroupName - The current name of the group.
     * @param {string} newGroupName - The new name for the group.
     * @param {Array} newGroupAccounts - The array of accounts associated with the new group.
     */
    const changeGroup = async (oldGroupName, newGroupName, newGroupAccounts) => {
		deleteGroup(oldGroupName)
		addGroup(newGroupName, newGroupAccounts)
		updateGroups()
	};


	/**
     * Adds a new group with the specified name and accounts.
     * @param {string} newGroupName - The name of the new group.
     * @param {Array} elemList - The list of elements associated with the new group.
     */
    const addGroup = async (newGroupName, elemList) => {
		var newGroupAccounts = {}
		for(const elem in elemList){
			const regex = /Social: (.*)  Account: (.*)/; // Token: (.*)/;
			const matchResult = regex.exec(elemList[elem]);
			const socialname = matchResult[1];
			const username = matchResult[2];
			const datasocial = accounts[socialname]
			for(const acc in datasocial){
				const account = datasocial[acc]
				if(account.username === username){
					newGroupAccounts[elem] = {
						social:socialname,
						username:username
					}
					break;
				}
			}
		}
		addDocumentToCollection("groups", newGroupName, newGroupAccounts);
		updateGroups()
	};


	/**
     * Updates the groups state by fetching the latest groups and their accounts from the database.
     */
	const updateGroups = () => {
		getGroups(groups, setGroups, groupKeys, setGroupKeys, forceRender, handleForceRender);
		handleForceRender()
	}


	/**
     * Deletes a group with the specified name.
     * @param {string} groupName - The name of the group to be deleted.
     */
	const deleteGroup = (groupName) => {
        try{
            deleteSpecificDocumentFromCollection("groups", groupName);
        }
        catch{
			alert("Unable to delete group " + groupName);
        }
		setGroupKeys(groupKeys.filter(name => name !== groupName));
		updateGroups()
    }


	/**
     * Renders the table for a specific group, allowing users to view, edit, and delete accounts within the group.
     * @param {string} groupName - The name of the group to be rendered.
     * @returns {JSX.Element} - The JSX element representing the group table.
     */
    const renderTable = (groupName) => {
		const accounts = groups[groupName];
		const elemCount = Object.keys(accounts).length;

		return(
			<>
				<GroupTable
					admin={userAdmin}
					accountsKeys={accountsKeys}
					groupKeys={groupKeys}
					groupName={groupName}
					groupAccounts={groups}

					changeGroup={(oldGroupName, newGroupName, newGroupAccounts) => changeGroup(oldGroupName, newGroupName, newGroupAccounts)}
					deleteGroup={(groupName) => deleteGroup(groupName)}
				/>
			</>
		)
	};

	useEffect(() => {
        if (isloading) return;
        if (!loggedUser) return navigate("/login");
        if(Object.keys(groups).length <= 0){
			getGroups(groups, setGroups, groupKeys, setGroupKeys, forceRender, handleForceRender);
			getAccounts(setAccounts, accountsKeys);
			getUser(loggedUser, userAdmin, setUserAdmin)
		}
    }, [loggedUser, userAdmin, isloading, groups, groupKeys, accounts, accountsKeys]);

	return (
		<div className="Container">
			<Header />
			<div className="content">
				<div className=''>
					{groupKeys.map((group) => (
						<div key={group}>
							{renderTable(group)}
						</div>
					))}
				</div>
				<div className=''>
					<AddGroup 
						groupKeys={groupKeys}
						accountsKeys={accountsKeys}
						addGroup={(newGroupName, newGroupAccounts) => addGroup(newGroupName, newGroupAccounts)}
						
						show={show}
						toggleShow={() => setShow(!show)}
					/>
				</div>
				
			</div>
			<Footer />
		</div>
	);
};

export default Groups;