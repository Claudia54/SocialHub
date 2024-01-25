import "../Styles/Components/Forms.css";

import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

/**
 * AddUser component for adding new users.
 *
 * @param {Object} props - Component properties.
 * @param {boolean} props.show - Flag to determine whether to show the modal.
 * @param {Array} props.roles - Array of available roles.
 * @param {Array} props.emails - Array of existing emails.
 * @param {function} props.toggleShow - Function to toggle the visibility of the modal.
 * @param {function} props.newUser - Function to add a new user.
 * @param {function} props.render - Function to trigger a re-render.
 * @returns {JSX.Element} - The JSX element representing the AddUser component.
 */
export default function AddUser(props) {
    const [addOptionFlag, setAddOptionFlag] = useState(false);
    const [emailUsedFlag, setEmailUsedFlag] = useState(false);
    const [emailNotValidFlag, setEmailNotValidFlag] = useState(false);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState(props.roles[0]);
    const [admin, setAdmin] = useState(false);
    const [show, setShow] = useState(props.show);
    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    /**
     * Resets form variables to their initial state.
     */
    const resetVar = () => {
        setName('');
        setPhone('');
        setRole('');
        setAdmin(false);
        setAddOptionFlag(false)
        setEmailUsedFlag(false)
    }


     /**
     * Handles changes in the email input field.
     * Validates email format and checks for existing emails.
     * @param {Object} e - Event object.
     */
    const handleEmailChange = (e) => {

        if (!e) {
            // e is undefined or null, or e.target.value is an empty string, set both flags to false and do nothing
            setEmailUsedFlag(false);
            setEmailNotValidFlag(false);
            return;
        }

        const newEmail = e.target.value;
        setEmail(newEmail);
    
        // Email validation logic
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(newEmail);
    
        // Check if email is in use
        setEmailUsedFlag(props.emails.includes(newEmail));
    
        // Check if email is not valid
        setEmailNotValidFlag(!isValidEmail);
    };

    
    /**
     * Handles the closing of the modal.
     */
    const handleS = () => {
        resetVar()
        props.toggleShow();
    }

    return (
        <>
            <button onClick={() => props.show ? resetVar() : handleS()} className="addUserButton">Add User</button>
            <Modal
                show={props.show}
                onHide={() => setShow(false)}
                backdrop="static"
                keyboard={false}
                className="alladdUser2"
            >
                <div className="alladdUser">
                    <Modal.Header className="header">
                        Add User
                    </Modal.Header>
                    <Modal.Body className="body-text">
                        <form  id="editmodal" >
                            <div className="divparam">
                                <div className="divparamtitle1">
                                    <label className="label1" form="email">Email</label>
                                </div>
                                <div className="divparamtitle2">
                                    <input
                                        className="input1"
                                        id="email"
                                        type="text"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                </div>
                            </div>
                            {(emailUsedFlag) ? (
                                <h4 style={{ color: '#FF7F7F', margin: '10px 0' }}>
                                    Email is already in use!
                                </h4>
                            ) : null}
                            {(emailNotValidFlag) ? (
                                <h4 style={{ color: '#FF7F7F', margin: '10px 0' }}>
                                    Invalid email format!
                                </h4>
                            ) : null}
                            <div className="divparam">
                                <div className="divparamtitle1">
                                    <label className="label1" form="name">Name</label>
                                </div>
                                <div className="divparamtitle2">
                                    <input
                                        className="input1"
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="divparam" >
                                <div className="divparamtitle1" >
                                    <label className="label1" form="phone">Phone</label>
                                </div>
                                <div className="divparamtitle2">
                                    <input
                                        className="input1"
                                        id="Phone"
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => {

                                            // Remove non-numeric characters
                                            const numericValue = e.target.value.replace(/\D/g, '');

                                            // Limit the length to 9 digits
                                            const limitedValue = numericValue.slice(0, 9);

                                            // Update the state with the cleaned and limited value

                                            setPhone(limitedValue);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="divparam">
                                <div className="divparamtitle1">
                                    <label className="label1" form="role" >Role</label>
                                </div>
                                <div className="divparamtitle2">
                                    {(addOptionFlag == false) ? (
                                        <select 
                                            id="Role" 
                                            className="input1"
                                            value={role}
                                            onChange={(e) => {
                                                if (e.target.value == 1){
                                                    setAddOptionFlag(true)
                                                    setRole('')
                                                }
                                                else{
                                                    setRole(e.target.value);
                                                }
                                            }}>
                                            {props.roles.map((role, index) => (
                                                <option key={role} value={role}>{role}</option>
                                            ))}
                                            {/*<option value="Journalist">Journalist</option>
                                            <option value="Manager">Manager</option>
                                            <option value="Team Leader">Team Leader</option>*/}
                                            <option value={1}>Add Option</option>
                                        </select>
                                    ) : (
                                        <input
                                            className="input1"
                                            id="Role"
                                            type="text"
                                            value={role}
                                            onChange={(e) => {
                                                setRole(e.target.value);
                                            }}
                                        />
                                    )}
                                    {/*<select 
                                        id="Role" 
                                        className="input1"
                                        value={role}
                                        onChange={(e) => {
                                            setRole(e.target.value);
                                        }}>
                                        <option value="Journalist">Journalist</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Team Leader">Team Leader</option>
                                        <option value={1}>Add Option</option>
                                    </select>*/}
                                </div>
                            </div>
                            <div className="divparam" >
                                <div className="divparamtitle1" >
                                    <label className="label1" form="admin">Grant Admin</label>
                                </div>
                                <div className="divparamtitle2">
                                    <input id="Admin"
                                        type="checkbox"
                                        value={admin}
                                        className="checkbox"
                                        onClick={() => {
                                            setAdmin(!admin);
                                        }}
                                    />
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer className="buttons">
                        <button className="addbutton"
                            onClick={() => {
                                    if(!emailUsedFlag && role != '' && email!=''){
                                        props.newUser(email, name, phone, role, admin);
                                        props.render(email, name, phone, role, admin);
                                        //resetVar()
                                        props.toggleShow();
                                    }
                                }
                            }
                        >
                            Add
                        </button>
                        <button className="cancelbutton" 
                            onClick={() => {
                                    resetVar()
                                    props.toggleShow()
                                }
                            }
                        >
                            Close
                        </button>
                    </Modal.Footer>
                </div>
                
            </Modal>
        </>
    );
}