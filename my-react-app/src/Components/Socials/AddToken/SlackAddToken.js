import "../../../Styles/Components/Forms.css";

import { useState } from "react";

const SlackString = 'Slack';

/**
 *SlackAddToken component for adding Slack token.
 *
 * @param {Object} props - Component properties.
 * @param {Function} props.setParams - Function to set parameters in the parent component.
 * @returns {JSX.Element} - JSX element representing the SlackAddToken component.
 */
export default function SlackAddToken(props) {
    const [username, setUsername] = useState('');
    const [url, setUrl] = useState('');

    return(
        <div>
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
                                url:url,
                                username:e.target.value,
                            })
                        }}
                    />
                </div>
            </div>
                <div className="divparam">
                    <div className="divparamtitle1"> 
                        <label className="label1" >Url</label>
                    </div>
                <div className="divparamtitle2">
                    <input 
                        className="input1"
                        type="text"
                        value={url}
                        onChange={(e) => {
                            setUrl(e.target.value)
                            props.setParams({
                                url:e.target.value,
                                username:username,
                            })
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
