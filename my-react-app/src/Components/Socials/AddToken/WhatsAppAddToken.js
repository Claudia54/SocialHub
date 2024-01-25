import "../../../Styles/Components/Forms.css";

import { useState } from "react";

const WhatsAppString = 'WhatsApp';

/**
 *WhatsappAddToken component for adding Whatsapp token.
 *
 * @param {Object} props - Component properties.
 * @param {Function} props.setParams - Function to set parameters in the parent component.
 * @returns {JSX.Element} - JSX element representing the WhatsappAddToken component.
 */
export default function WhatsAppAddToken(props) {
    return(
        <>
            {(props.socials.includes(WhatsAppString))? (
                <>
                    <div className="title">{WhatsAppString}</div>
                    <div className="inputContainer">
                        <label className="text" htmlFor="textInput">Text: </label>
                        <textarea
                            type="text"
                            className="textbox"
                            id="textInput"
                            //value={props.params['WhatsApp']['text']}
                            onChange={(e) => {props.params[WhatsAppString]['text'] = e.target.value}}
                        />
                    </div>
                    <div>
                        <label htmlFor="imageInput">Select Image: </label>
                        <input
                            type="file"
                            className="buttonPost"
                            id="imageInput"
                            //onChange={handleImageChange}
                        />
                    </div>
                    <div className="url">
                        <label className="urlName" htmlFor="urlInput">URL: </label>
                        <textarea
                            type="text"
                            className="urlbox"
                            id="urlInput"
                            //value={url}
                            onChange={(e) => {props.params[WhatsAppString]['url'] = e.target.value}}
                        />
                    </div>
                </>
            ) : (
                <>
                </>
            )}
        </>
    )

}