import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

/**
 * FacebookEdit component for editing Facebook Token.
 *
 * @param {Object} props - Component properties.
 * @param {boolean} props.show - Flag to control the visibility of the modal.
 * @param {number} props.account - Index of the selected account.
 * @param {Object[]} props.accounts - Array of Facebook accounts.
 * @param {Function} props.handleSubmit - Function to handle form submission.
 * @returns {JSX.Element} - JSX element representing the FacebookEdit component.
 */
const FacebookEdit = (props) => {
    const [show, setShow] = useState(false);
    
    const [selectedAccount, setSelectedAccount] = useState(props.account);
    const [newToken, setNewToken] = useState(''); 

    if(selectedAccount < 0){
        setSelectedAccount(props.account)
    }

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
                        Edit Token
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
                                <label className="label1">Token</label>
                            </div>
                            <input
                                className="divparamtitle2"
                                type="text"
                                id = "index"
                                name="token"
                                value={newToken}
                                onChange={(e) => setNewToken(e.target.value)}
                            />
                        </div>
                    </div>
                    </Modal.Body>
                    <Modal.Footer className="buttons">
                        <button className="addbutton"
                            onClick={() => {
                                    if(newToken != ''){
                                        const lNewToken = [newToken]
                                        props.handleSubmit(selectedAccount, lNewToken);
                                        setNewToken('')
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

export default FacebookEdit;