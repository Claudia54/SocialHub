import { useState } from "react";
import ImageSlider from './ImageSlider';

const FacebookString = 'Facebook';

/**
 * FacebookForms component for handling Facebook-specific form inputs.
 *
 * @param {Object} props - Component properties.
 * @param {Array} props.socials - Array of available social media platforms.
 * @param {Object} props.params - Parameters for Facebook platform.
 * @param {Function} props.handleImageChange - Function to handle image change.
 * @returns {JSX.Element} - JSX element representing the FacebookForms component.
 */
export default function FacebookForms(props) {
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
            {(props.socials.includes(FacebookString)) ? (
                <>
                    <div className="title">{"Facebook"}</div>
                    <div className="inputContainer">
                        <label className="text" htmlFor="textInput">Text: </label>
                        <textarea
                            type="text"
                            className="textbox"
                            id="textInput"
                            onChange={(e) => {props.params[FacebookString]['text'] = e.target.value}}
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
                            onChange={(e) => {props.params[FacebookString]['images'] = e.target.files; handleImageChange(e)}}
                        />
                        <ImageSlider images={files} />
                    </div>
                    <div className="url">
                        <label className="urlName" htmlFor="urlInput">URL: </label>
                        <textarea
                            type="text"
                            className="urlbox"
                            id="urlInput"
                            onChange={(e) => {props.params[FacebookString]['url'] = e.target.value}}
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