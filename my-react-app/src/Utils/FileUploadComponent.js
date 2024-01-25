import React, { useState } from 'react';

/**
 * Component for handling file uploads.
 * Allows users to select multiple image files with specified formats.
 * Displays a list of selected files.
 * 
 * @returns {JSX.Element} - The JSX element representing the file upload component.
 */
const FileUploadComponent = () => {
    const [selectedFiles, setSelectedFiles] = useState(null);

    
     /**
     * Handles the change event when files are selected.
     * Filters selected files based on allowed types.
     * @param {object} event - The change event triggered by file selection.
     */
    const handleFileChange = (event) => {
        const { files } = event.target;
        // Filter selected files based on allowed types
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        const filteredFiles = [...files].filter((file) => allowedTypes.includes(file.type));
        setSelectedFiles(filteredFiles);
    };

    return (
        <div>
            <input
                type="file"
                accept="image/jpeg, image/jpg, image/png, image/gif"
                multiple
                onChange={handleFileChange}
            />
            {selectedFiles && (
                <div>
                    <p>Selected Files:</p>
                    <ul>
                        {selectedFiles.map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FileUploadComponent;