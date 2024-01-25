import { useState } from 'react';
import ImageSlider from './ImageSlider';

const WhatsAppString = 'WhatsApp';

/**
 * WhatsAppForms component for handling WhatsApp forms.
 *
 * @param {Object} props - Component properties.
 * @param {Array} props.socials - Array of available social media platforms.
 * @param {Object} props.params - Object containing parameters for WhatsApp.
 * @param {Function} props.params[WhatsAppString][text] - Function to update the text parameter.
 * @param {Function} props.params[WhatsAppString][images] - Function to update the images parameter.
 * @param {Function} props.params[WhatsAppString][url] - Function to update the URL parameter.
 * @returns {JSX.Element} - JSX element representing the WhatsAppForms component.
 */
export default function WhatsAppForms(props) {
    const [files, setFiles] = useState([]);

    function handleImageChange(e) {
        var newFiles = []
        for (var i = 0, l = e.target.files.length; i < l; i++) {
            var file = URL.createObjectURL(e.target.files[i]);
            newFiles.push(file);
        }
        setFiles(newFiles)
    }

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
                            accept=".png, .jpg, .jpeg, .gif"
                            multiple
                            className="buttonPost"
                            id="imageInput"
                            onChange={(e) => {props.params[WhatsAppString]['images'] = e.target.files; handleImageChange(e)}}
                        />
                        <ImageSlider images={files} />
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