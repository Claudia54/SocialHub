
/**
 * Posts content to Slack using the specified API endpoint.
 *
 * @param {Object} social - Social account information.
 * @param {string} title - Title of the post.
 * @returns {Promise<void>} - A Promise that resolves when the post request is complete.
 */ 
const postSlack = async (social, title) =>{
    const url = 'https://socialhubserver.onrender.com/postSlack';

    const formData = new FormData();
    formData.append('title', title);
    formData.append('url', social.url)

    try {
        await fetch(url, {
        method: 'POST',
        body: formData,
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

export { postSlack }
