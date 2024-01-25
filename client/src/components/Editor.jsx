import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './Editor.css';

const Editor = ({ selectedChannel, onAddMessage }) => {
    const [newMessage, setNewMessage] = useState('');

    const handleSubmit = async () => {
        if (!newMessage.trim() || !selectedChannel) return;

        // Optimistically update the UI with the new message
        onAddMessage(selectedChannel, newMessage.trim());
        setNewMessage(''); // Clear the input field

        try {
            await axios.post(
                `http://localhost:5000/messages/${selectedChannel}`,
                {
                    text: newMessage.trim(),
                },
            );

            // If the server response is successful, do nothing as the optimistic update is already there
        } catch (error) {
            // If there's an error, retrieve all messages for the channel and update the UI
            try {
                const response = await axios.get(
                    `http://localhost:5000/messages/${selectedChannel}`,
                );
                const newMessages = response.data;
                onAddMessage(selectedChannel, newMessages);
            } catch (error) {
                console.error(
                    'Error retrieving messages after failed POST:',
                    error,
                );
            }
        }
    };

    // Clear input when selectedChannel changes
    useEffect(() => {
        setNewMessage('');
    }, [selectedChannel]);

    return (
        <div className='editor-container'>
            <div className='editor'>
                <textarea
                    placeholder='Type a message...'
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                ></textarea>
                <button disabled={!newMessage.trim()} onClick={handleSubmit}>
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
