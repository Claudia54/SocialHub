import { useState } from 'react';
import ImageSlider from './ImageSlider';

const RedditString = 'Reddit';

/**
 * RedditForms component for handling Reddit forms.
 *
 * @param {Object} props - Component properties.
 * @param {Array} props.socials - Array of available social media platforms.
 * @param {Object} props.params - Object containing parameters for Reddit.
 * @param {Function} props.params[RedditString][title] - Function to update the title parameter.
 * @param {Function} props.params[RedditString][images] - Function to update the images parameter.
 * @param {Function} props.params[RedditString][text] - Function to update the text parameter.
 * @returns {JSX.Element} - JSX element representing the RedditForms component.
 */

export default function RedditForms(props) {
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
            {(props.socials.includes(RedditString)) ? (
                <>
                    <div className="title">{RedditString}</div>
                    <div className="inputContainer">
                        <label className="text" htmlFor="titleInput">Title: </label>
                        <textarea
                            type="text"
                            className="textbox"
                            id="titleInput"
                            onChange={(e) => {props.params[RedditString]['title'] = e.target.value}}
                        />
                    </div>
                    <>
                        {/*colocar estes dois lado a lado*/}
                        <div>
                            <label htmlFor="imageInput">Select Image: </label>
                            <input
                                type="file"
                                accept=".png, .jpg, .jpeg, .gif"
                                multiple
                                className="buttonPost"
                                id="imageInput"
                                onChange={(e) => {props.params[RedditString]['images'] = e.target.files; handleImageChange(e)}}
                            />
                            <ImageSlider images={files} />
                        </div>
                        <div className="">{"OR"}</div>
                        <div className="inputContainer">
                            <label className="textcontent" htmlFor="textcontentInput">Text-Content: </label>
                            <textarea
                                type="text"
                                className="textbox"
                                id="textcontentInput"
                                onChange={(e) => {props.params[RedditString]['text'] = e.target.value}}
                            />
                        </div>
                    </>
                </>
            ) : (
                <>
                </>
            )}
        </>
    )
}


