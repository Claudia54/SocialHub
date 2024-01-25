import FacebookForms from "./Socials/Post/FacebookForms";
import InstagramForms from './Socials/Post/InstagramForms';
import TwitterForms from './Socials/Post/TwitterForms';
import WhatsAppForms from './Socials/Post/WhatsAppForms';
import RedditForms from './Socials/Post/RedditForms';
import SlackForms from './Socials/Post/SlackForms';
import DiscordForms from './Socials/Post/DiscordForms';

/**
 * React component for rendering social account forms for different platforms.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.socials - Object containing social accounts data.
 * @param {Object} props.params - Object containing parameters.
 * @returns {JSX.Element} - The JSX element representing the SocialAccountsTable component.
 */
export default function SocialAccountsTable(props) {
    return(
        <>
            <DiscordForms
                socials={props.socials}
                params={props.params}
            />
            <FacebookForms
                socials={props.socials}
                params={props.params}
            />
            <InstagramForms
                socials={props.socials}
                params={props.params}
            />
            <RedditForms
                socials={props.socials}
                params={props.params}
            />
            <SlackForms
                socials={props.socials}
                params={props.params}
            />
            <TwitterForms
                socials={props.socials}
                params={props.params}
            />
        </>
    );
};
