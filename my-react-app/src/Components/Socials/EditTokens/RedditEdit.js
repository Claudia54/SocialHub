import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


/**
 * RedditEdit component for editing Reddit Client Info.
 *
 * @param {Object} props - Component properties.
 * @param {boolean} props.show - Flag to control the visibility of the modal.
 * @param {number} props.account - Index of the selected account.
 * @param {Object[]} props.accounts - Array of Reddit accounts.
 * @param {Function} props.handleSubmit - Function to handle form submission.
 * @returns {JSX.Element} - JSX element representing the RedditEdit component.
 */
const RedditEdit = (props) => {
    const [show, setShow] = useState(false);
    
    const [selectedAccount, setSelectedAccount] = useState(props.account);
    const [clientID, setClientID] = useState(''); 
    const [clientSecret, setClientSecret] = useState(''); 

    return (
        <>
            <button className='buttonUsers' onClick={() => show ? null : setShow(!show)} >Edit</button>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                backdrop="static"
                keyboard={false}
                className="alladdUser2"
            >
                <div className="alladdUser">
                    <Modal.Header className="header">
                        Edit Client Info
                    </Modal.Header>
                    <Modal.Body className="body-text">
                    <div className="edit-form-container">
                        <div className="divparam">
                            <div className="divparamtitle1">
                                <label className="label1">Username</label>
                            </div>
                            <input
                                className="divparamtitle2"
                                type="text"
                                value={props.accounts[selectedAccount].username}
                                disabled
                            />
                        </div>
                        <div className="divparam">
                            <div className="divparamtitle1">
                                <label className="label1">Client ID</label>
                            </div>
                            <input
                                className="divparamtitle2"
                                type="text"
                                name="clientID"
                                onChange={(e) => setClientID(e.target.value)}
                            />
                        </div>
                        <div className="divparam">
                            <div className="divparamtitle1">
                                <label className="label1">Client Secret</label>
                            </div>
                            <input
                                className="divparamtitle2"
                                type="text"
                                name="clientSecret"
                                onChange={(e) => setClientSecret(e.target.value)}
                            />
                        </div>
                    </div>
                    </Modal.Body>
                    <Modal.Footer className="buttons">
                        <button className="addbutton"
                            onClick={() => {
                                if(clientID != ''){
                                    const lNewToken = [clientID, clientSecret]
                                    props.handleSubmit(selectedAccount, lNewToken);
                                    setClientID('')
                                    setClientSecret('')
                                    setShow(false);
                                }
                                }
                            }
                        >
                            Save
                        </button>
                        <button className="cancelbutton" onClick={() => {setShow(false);}}>Close</button>
                    </Modal.Footer>
                </div>
                
            </Modal>
        </>        
    );
};

export default RedditEdit;
