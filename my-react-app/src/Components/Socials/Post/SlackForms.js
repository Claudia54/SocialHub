const SlackString = 'Slack';

/**
 * SlackForms component for handling Slack forms.
 *
 * @param {Object} props - Component properties.
 * @param {Array} props.socials - Array of available social media platforms.
 * @param {Object} props.params - Object containing parameters for Slack.
 * @param {Function} props.params[SlackString][text] - Function to update the text parameter.
 * @returns {JSX.Element} - JSX element representing the SlackForms component.
 */
export default function SlackForms(props) {
    return(
        <>
            {(props.socials.includes(SlackString)) ? (
                <>
                    <div className="title">{SlackString}</div>
                    <div className="inputContainer">
                        <label className="text" htmlFor="textInput">Text: </label>
                        <textarea
                            type="text"
                            className="textbox"
                            id="textInput"
                            onChange={(e) => {props.params[SlackString]['text'] = e.target.value}}
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