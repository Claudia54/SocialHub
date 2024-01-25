/**
 * Posts content to Reddit using the specified API endpoint.
 *
 * @param {Object} social - Social account information.
 * @param {string} title - Title of the post.
 * @param {string} content - Content of the post.
 * @param {FileList} images - List of image files to be included in the post.
 * @returns {Promise<void>} - A Promise that resolves when the post request is complete.
 */

const postReddit = async (social, title, content, images) =>{
    const url = 'https://socialhubserver.onrender.com/postReddit';

    const formData = new FormData();
    formData.append('title', title);
    formData.append('url', social.url)
    formData.append('client_id', social.client_id)
    formData.append('client_secret', social.client_secret)
    formData.append('password', social.password)
    formData.append('username', social.user_agent)
    formData.append('user_agent', social.username)
    formData.append('community', social.community)

    try {
        if(images){
            for (let i = 0; i < images.length; i++) {
                const file = images[i];
                formData.append('images', file);
            }
        }
        else formData.append('content', content);

        await fetch(url, {
        method: 'POST',
        body: formData,
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

export { postReddit }
