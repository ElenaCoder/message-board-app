import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './Editor.css';

const Editor = ({ selectedChannel, onAddMessage }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        if (!message || !selectedChannel) {
            // Handle invalid input or channel
            return;
        }

        try {
            // Send the new message to the server
            await axios.post(
                `http://localhost:5000/messages/${selectedChannel}`,
                {
                    text: message,
                },
            );

            onAddMessage(selectedChannel, message);

            // Clear the input field after submission
            setMessage('');
        } catch (error) {
            console.error('Error adding message:', error);
        }
    };

    // Clear input when selectedChannel changes
    useEffect(() => {
        setMessage('');
    }, [selectedChannel]);

    return (
        <div className='editor-container'>
            <div className='editor'>
                <textarea
                    placeholder='Type a message...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <button disabled={!message} onClick={handleSubmit}>
                    Send
                </button>
            </div>
        </div>
    );
};

// Add PropTypes validation
Editor.propTypes = {
    selectedChannel: PropTypes.string.isRequired,
    onAddMessage: PropTypes.func.isRequired,
};
export default Editor;
