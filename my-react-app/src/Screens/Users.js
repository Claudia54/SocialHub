import "../Styles/Screens/Users.css";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddUser from "../Components/AddUser";

import {
    getAllDocumentsFromCollection,
    getAllDocumentsFromCollectionWithUID,
    deleteSpecificDocumentFromCollection,
    updateSpecificDocumentInCollection,
    addDocumentToCollection
} from "../firebaseQueries";

import { 
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { secretKey } from "../secretKey";
import { getCache } from "../Utils/AppCache";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import CryptoJS from 'crypto-js';

import Footer from "../Components/Footer";
import Header from "../Components/Header";

/**
 * React component representing the user management page.
 * Displays a list of company users, their details, and allows administrators to perform actions such as adding, removing, and promoting/demoting users.
 * 
 * @returns {JSX.Element} - The JSX element representing the Users component.
 */
const Users = () => {
    const auth = getAuth();
	const [loggedUser, isloading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const [emails, setEmails] = useState([]);
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const [admin, setAdmin] = useState(false);
    const [email, setEmail] = useState("");
    const [show, setShow] = useState(false);

    const [newuserEmail, setNewuserEmail] = useState("");
    const [newuserName, setNewuserName] = useState("");
    const [newuserPhone, setNewuserPhone] = useState("");
    const [newuserRole, setNewuserRole] = useState("");
    const [newuserAdmin, setNewuserAdmin] = useState(false);
    const [newUser, setNewUser] = useState({});
    

    /**
     * Creates a new user with specified details.
     * @param {string} email - The email of the new user.
     * @param {string} name - The name of the new user.
     * @param {string} phone - The phone number of the new user.
     * @param {string} role - The role of the new user.
     * @param {boolean} admin - The admin status of the new user.
     */
    const createUser = async (email, name, phone, role, admin) => {

        setNewuserEmail(email);
        setNewuserName(name);
        setNewuserPhone(phone);
        setNewuserRole(role);
        setNewuserAdmin(admin);
    }


    /**
     * Decrypts encrypted data using a secret key.
     * @param {string} encryptedData - The data to be decrypted.
     * @param {string} secretKey - The secret key for decryption.
     * @returns {any} - The decrypted data.
     */
    const decryptData = (encryptedData, secretKey) => {
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    };


    /**
     * Handles the addition of a new user.
     * @param {string} email - The email of the new user.
     * @param {string} name - The name of the new user.
     * @param {string} phone - The phone number of the new user.
     * @param {string} role - The role of the new user.
     * @param {boolean} admin - The admin status of the new user.
     */
    const handleAddUser = async (email, name, phone, role, admin) => {
        try{
            const decryptedPass = decryptData(getCache().data["password"].value, secretKey);
            const emailOldUser = auth.currentUser.email + '';
            const passOldUser = decryptedPass.password;

            const uid = await createUserWithEmailAndPassword(auth, email, Math.random().toString());
            await addDocumentToCollection("users", uid.user.uid, {
                admin: admin,
                email: email,
                name: name,
                phone: phone,
                role: role,
            });
            await sendPasswordResetEmail(auth, email);

            await signInWithEmailAndPassword(auth, emailOldUser, passOldUser);
        }
        catch(error){
            console.log("Erro: " + error);
        }
        fetchUsers();
    };


     /**
     * Handles the removal of admin status from a user.
     * @param {string} userUID - The UID of the user.
     */
    const handleRemoveAdmin = (userUID) => {
        updateSpecificDocumentInCollection("users", userUID, {admin: false}).then(() => {
            fetchUsers();
        }).catch((error) => {
            console.error("Error updating document: ", error);
        });
    };


    /**
     * Handles the promotion of a user to admin status.
     * @param {string} userUID - The UID of the user.
     */
    const handleMakeAdmin = (userUID) => {
        updateSpecificDocumentInCollection("users", userUID, {admin: true}).then(() => {
            fetchUsers();
        }).catch((error) => {
            console.error("Error updating document: ", error);
        });
    };


     /**
     * Handles the removal of a user.
     * @param {string} userUID - The UID of the user.
     */
    const handleRemoveUser = (userUID) => {
        try {
            deleteSpecificDocumentFromCollection("users", userUID);
            console.log('Successfully deleted user');
        } catch (error) {
            console.log('Error deleting user:', error.message);
        }
        fetchUsers();
    };

    
    /**
     * Fetches the list of users from the database.
     */
    const fetchUsers = async () => {
        try {
            const users = (await getAllDocumentsFromCollectionWithUID("users"))
            const user = users.filter((user) => user.data.email === loggedUser.email)[0];
            setAdmin(user.data.admin);
            setEmail(user.data.email);
            setUsers(users);
            const listRoles = []
            const listEmails = []
            for(const u in users){
                const user = users[u].data
                if(!listRoles.includes(user.role)){
                    listRoles.push(user.role)
                }
                if(!listEmails.includes(user.email)){
                    listEmails.push(user.email)
                }
            }
            setRoles(listRoles)
            setEmails(listEmails)
        }
        catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        if (isloading) return;
        if (!loggedUser) return navigate("/login");
        fetchUsers();
    }, [loggedUser, isloading]);
    
    if(admin){
        return(
            <div className="Container">
                <Header/>
                <div className="content">
                    <h1> COMPANY USERS </h1>
                    <table className='table' border="1">
                        <thead>
                        <tr>
                            <th className='th'>Email</th>
                            <th className='th'>Phone</th>
                            <th className='th'>Role</th>
                            <th className='th'>Type</th>
                            <th className='th'>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td className='td' key={user.data.email}>
                                        {user.data.email}
                                    </td>
                                    <td className='td' key={user.data.phone}>
                                        {user.data.phone}
                                    </td>
                                    <td className='td' key={user.data.role}>
                                        {user.data.role}
                                    </td>
                                    <td className='td' key={user.data.admin}>
                                        {user.data.admin ? 'Admin' : 'User'}
                                    </td>
                                    <td  className='td' key={user.admin}>
                                        {admin && email !== user.data.email ? <button className="removeUserButton buttonUsers" onClick={() => handleRemoveUser(user.uid)} > Remove User </button> : null}
                                        {admin && email !== user.data.email ? (user.data.admin ? <button className="buttonUsers"onClick={() => handleRemoveAdmin(user.uid)}> Remove Admin </button> : <button className="buttonUsers"onClick={() => handleMakeAdmin(user.uid)}> Make Admin </button>) : null}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <AddUser
                        show={show}
                        toggleShow={() => setShow(!show)}
                        
                        roles={roles}
                        emails={emails}

                        newUser={(email, name, phone, role, admin) => createUser(email, name, phone, role, admin)}
                        render={(email, name, phone, role, admin) => handleAddUser(email, name, phone, role, admin)}
                    />
                </div>
                <Footer/>
            </div>
        );
    }
    else{
        return(
            <div className="Container">
                <Header/>
                <div className="content">
                    <h1> COMPANY USERS </h1>
                    <table className='table' border="1">
                        <thead>
                        <tr>
                            <th className='th'>Email</th>
                            <th className='th'>Phone</th>
                            <th className='th'>Role</th>
                            <th className='th'>Type</th>
                            
                        </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr>
                                    <td className='td' key={user.data.email}>
                                        {user.data.email}
                                    </td>
                                    <td className='td' key={user.data.phone}>
                                        {user.data.phone}
                                    </td>
                                    <td className='td' key={user.data.role}>
                                        {user.data.role}
                                    </td>
                                    <td className='td'key={user.data.admin}>
                                        {user.data.admin ? 'Admin' : 'User'}
                                    </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Footer/>
            </div>
        );
    }
};

export default Users;