import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './MessageList.css';

const MessageList = ({ selectedChannel }) => {
    const [messages, setMessages] = useState({});

    useEffect(() => {
        const fetchMessages = async () => {
            if (selectedChannel) {
                // Check if messages for the selected channel are in local state
                if (messages[selectedChannel]) {
                    // Messages are already in local state, no need to fetch from the server
                    return;
                }
                try {
                    const response = await axios.get(
                      `http://localhost:5000/api/messages/${selectedChannel}`
                    );
                    const newMessages = response.data;

                    // Update local state with new messages for the selected channel
                    setMessages((prevMessages) => ({
                        ...prevMessages,
                        [selectedChannel]: newMessages,
                    }));
                } catch (error) {
                    console.error('Error fetching messages:', error);
                }
            }
        };

        fetchMessages();
    }, [selectedChannel, messages]);

    return (
        <div className='message-list'>
            <h2>Messages</h2>
            {selectedChannel && (
                <ul>
                    {messages[selectedChannel]?.map((message, index) => (
                        <li key={index}>{message.text}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

// Add prop type validation
MessageList.propTypes = {
  selectedChannel: PropTypes.string.isRequired,
};

export default MessageList;