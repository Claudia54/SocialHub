
/**
 * Posts content to a Discord server using the specified API endpoint.
 *
 * @param {Object} social - Social account information.
 * @param {string} title - Title of the post.
 * @param {FileList} images - List of image files to be included in the post.
 * @returns {Promise<void>} - A Promise that resolves when the post request is complete.
 */
const postDiscord = async (social, title, images) =>{
    const url = 'https://socialhubserver.onrender.com/postDiscord';

    const formData = new FormData();
    formData.append('title', title);
    formData.append('url', social.url);

    try {
        if(images){
            for (let i = 0; i < images.length; i++) {
                const file = images[i];
                formData.append('images', file);
            }
        }
        await fetch(url, {
        method: 'POST',
        body: formData,
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

export { postDiscord };
