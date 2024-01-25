import { useState } from 'react';
import ImageSlider from './ImageSlider';

const DiscordString = 'Discord';

/**
 * DiscordForms component for handling Discord-specific form inputs.
 *
 * @param {Object} props - Component properties.
 * @param {Array} props.socials - Array of available social media platforms.
 * @param {Object} props.params - Parameters for Discord platform.
 * @param {Function} props.handleImageChange - Function to handle image change.
 * @returns {JSX.Element} - JSX element representing the DiscordForms component.
 */
export default function DiscordForms(props) {
    const [files, setFiles] = useState([]);


    /**
     * Function to handle image change.
     *
     * @param {Object} e - Event object representing the file input change.
     */
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
            {(props.socials.includes(DiscordString)) ? (
                <>
                    <div className="title">{DiscordString}</div>
                    <div className="inputContainer">
                        <label className="text" htmlFor="titleInput">Text: </label>
                        <textarea
                            type="text"
                            className="textbox"
                            id="textInput"
                            onChange={(e) => {props.params[DiscordString]['text'] = e.target.value}}
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
                            onChange={(e) => {props.params[DiscordString]['images'] = e.target.files; handleImageChange(e)}}
                        />
                        <ImageSlider images={files} />
                    </div>
                </>
            ) : (
                <>
                </>
            )}
        </>
    )

}