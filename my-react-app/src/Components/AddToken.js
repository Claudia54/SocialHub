import FacebookAddToken from './Socials/AddToken/FacebookAddToken';
import InstagramAddToken from './Socials/AddToken/InstagramAddToken';
import RedditAddToken from './Socials/AddToken/RedditAddToken';
import TwitterAddToken from './Socials/AddToken/TwitterAddToken';
import WhatsAppAddToken from './Socials/AddToken/WhatsAppAddToken';
import SlackAddToken from './Socials/AddToken/SlackAddToken';
import DiscordAddToken from './Socials/AddToken/DiscordAddToken';

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { FacebookString, InstagramString, RedditString, TwitterString, WhatsAppString, DiscordString, SlackString, availableSocials } from '../Utils/Static';


/**
 * AddToken component for adding a new account token.
 *
 * @param {Object} props - Component properties.
 * @param {boolean} props.show - Boolean indicating whether to display the modal.
 * @param {string[]} props.socials - Array of available social media platforms.
 * @param {Function} props.addToken - Function to add a new account token.
 * @param {Function} props.toggleShow - Function to toggle the modal visibility.
 * @returns {JSX.Element} - The JSX element representing the AddToken component.
 */
export default function AddToken(props) {
    const [social, setSocial] = useState(availableSocials[0])
    const [params, setParams] = useState({});

    const [show, setShow] = useState(props.show);


    return (
        <>
            <button onClick={() => props.show ? null : props.toggleShow()} className="addUserButton">Add Token</button>
            
            <Modal
                show={props.show}
                onHide={() => setShow(false)}
                backdrop="static"
                keyboard={false}
                className="alladdUser2"
            >
                <div className="alladdUser">
                    <Modal.Header className="header">
                        Add Account
                    </Modal.Header>
                    <Modal.Body className="body-text">
                        <form id="editmodal" >
                            <div className="divparam">
                                <div className="divparamtitle1">
                                    <label className="label1" form="social">Social</label>
                                </div>
                                <div className="divparamtitle2">
                                    <select 
                                        id="Social" 
                                        className="input1"
                                        value={social}
                                        onChange={(e) => {
                                            setSocial(e.target.value);
                                        }}
                                    >
                                        {(props.socials).map((soc, index) => (
                                            <option key={soc} value={soc}>{soc}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <>
                                {
                                    (social === FacebookString) ? (
                                        <FacebookAddToken 
                                            setParams={(p) => setParams(p)}
                                            //params={props.params}
                                        />
                                        ) : 
                                    (social === InstagramString) ? (
                                        <InstagramAddToken 
                                            setParams={(p) => setParams(p)}
                                            //params={props.params}
                                        />
                                    ) : 
                                    (social === RedditString) ? (
                                        <RedditAddToken
                                            setParams={(p) => setParams(p)}
                                            //params={props.params}
                                        />
                                    ) : 
                                    (social === TwitterString) ? (
                                        <TwitterAddToken
                                            setParams={(p) => setParams(p)}
                                            //params={props.params}
                                        />
                                    ) : 
                                    (social === SlackString) ? (
                                        <SlackAddToken
                                            setParams={(p) => setParams(p)}
                                            //params={props.params}
                                        />
                                    ) : 
                                    (social === DiscordString) ? (
                                        <DiscordAddToken
                                            setParams={(p) => setParams(p)}
                                            //params={props.params}
                                        />
                                    ) : 
                                    (social === WhatsAppString) ? (
                                        <WhatsAppAddToken
                                            setParams={(p) => setParams(p)}
                                            //params={props.params}
                                        />
                                    ) : (
                                        <>
                                        </>
                                    )
                                }
                            </>
                        </form>
                    </Modal.Body>
                    <Modal.Footer className="buttons">
                        <button className="addbutton"
                            onClick={() => {
                                    if(Object.keys(params).length > 1){
                                        props.addToken(social, params)
                                        props.toggleShow();
                                    }
                                }
                            }
                        >
                            Add
                        </button>
                        <button className="cancelbutton" onClick={() => props.toggleShow()}>Close</button>
                    </Modal.Footer>
                </div>
                
            </Modal>
        </>
    );
}