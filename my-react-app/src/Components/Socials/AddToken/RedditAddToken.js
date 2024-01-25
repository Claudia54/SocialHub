import "../../../Styles/Components/Forms.css";

import { useState } from "react";


/**
 *RedditAddToken component for adding Reddit token.
 *
 * @param {Object} props - Component properties.
 * @param {Function} props.setParams - Function to set parameters in the parent component.
 * @returns {JSX.Element} - JSX element representing the RedditAddToken component.
 */
export default function RedditAddToken(props) {
    const [client_id, setClient_id] = useState('');
    const [client_secret, setClient_secret] = useState('');
    const [community, setCommunity] = useState('');
    const [password, setPassword] = useState('');
    const [user_agent, setUser_agent] = useState('');
    const [username, setUsername] = useState('');
    
    return(
        <div class="body-content modal-body" >
                <div className="divparam">
                    <div className="divparamtitle1"> 
                        <label className="label1" >Client ID</label>
                    </div>
                    <div className="divparamtitle2">
                        <input 
                            className="input1"
                            type="text"
                            value={client_id}
                            onChange={(e) => {
                                setClient_id(e.target.value)
                                props.setParams({
                                    client_id:e.target.value,
                                    client_secret:client_secret,
                                    community:community,
                                    password:password,
                                    user_agent:user_agent,
                                    username:username,
                                })
                            }}
                        />
                    </div>
                </div>
                <div className="divparam">
                    <div className="divparamtitle1"> 
                        <label className="label1" >Client Secret</label>
                    </div>
                    <div className="divparamtitle2">
                        <input 
                            className="input1"
                            type="text"
                            value={client_secret}
                            onChange={(e) => {
                                setClient_secret(e.target.value)
                                props.setParams({
                                    client_id:client_id,
                                    client_secret:e.target.value,
                                    community:community,
                                    password:password,
                                    user_agent:user_agent,
                                    username:username,
                                })
                            }}
                        />
                    </div>
                </div>
                <div className="divparam">
                    <div className="divparamtitle1"> 
                        <label className="label1" >Community</label>
                    </div>
                    <div className="divparamtitle2">
                        <input 
                            className="input1"
                            type="text"
                            value={community}
                            onChange={(e) => {
                                setCommunity(e.target.value)
                                props.setParams({
                                    client_id:client_id,
                                    client_secret:client_secret,
                                    community:e.target.value,
                                    password:password,
                                    user_agent:user_agent,
                                    username:username,
                                })
                            }}
                        />
                    </div>
                </div>
                <div className="divparam">
                    <div className="divparamtitle1"> 
                        <label className="label1" >Password</label>
                    </div>
                    <div className="divparamtitle2">
                        <input 
                            className="input1"
                            type="text"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                props.setParams({
                                    client_id:client_id,
                                    client_secret:client_secret,
                                    community:community,
                                    password:e.target.value,
                                    user_agent:user_agent,
                                    username:username,
                                })
                            }}
                        />
                    </div>
                </div>
                <div className="divparam">
                    <div className="divparamtitle1"> 
                        <label className="label1" >User Agent</label>
                    </div>
                    <div className="divparamtitle2">
                        <input 
                            className="input1"
                            type="text"
                            value={user_agent}
                            onChange={(e) => {
                                setUser_agent(e.target.value)
                                props.setParams({
                                    client_id:client_id,
                                    client_secret:client_secret,
                                    community:community,
                                    password:password,
                                    user_agent:e.target.value,
                                    username:username,
                                })
                            }}
                        />
                    </div>
                </div>
                <div className="divparam">
                    <div className="divparamtitle1"> 
                        <label className="label1" >Username</label>
                    </div>
                    <div className="divparamtitle2">
                        <input 
                            className="input1"
                            type="text"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value)
                                props.setParams({
                                    client_id:client_id,
                                    client_secret:client_secret,
                                    community:community,
                                    password:password,
                                    user_agent:user_agent,
                                    username:e.target.value,
                                })
                            }}
                        />
                    </div>
                </div>
        </div>
);
}
