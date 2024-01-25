import "../../../Styles/Components/Forms.css";

import { useState } from "react";

/**
 *FacebookAddToken component for adding Facebook token.
 *
 * @param {Object} props - Component properties.
 * @param {Function} props.setParams - Function to set parameters in the parent component.
 * @returns {JSX.Element} - JSX element representing the FacebookAddToken component.
 */
export default function FacebookAddToken(props) {
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    
    return(
        <div>
            <div className="divparam">
                <div className="divparamtitle1"> 
                    <label className="label1" >Email</label>
                </div>
                <div className="divparamtitle2">
                    <input 
                        className="input1"
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value)
                            props.setParams({
                                token:token,
                                username:e.target.value,
                            })
                        }}
                    />
                </div>
            </div>
                <div className="divparam">
                    <div className="divparamtitle1"> 
                        <label className="label1" >Token</label>
                    </div>
                <div className="divparamtitle2">
                    <input 
                        className="input1"
                        type="text"
                        value={token}
                        onChange={(e) => {
                            setToken(e.target.value)
                            props.setParams({
                                token:e.target.value,
                                username:username,
                            })
                        }}
                    />
                </div>
        </div>
    </div>
);
}