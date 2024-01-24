import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './MessageList.css';

const MessageList = ({ selectedChannel, messages, onAddMessage }) => {

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedChannel && !messages[selectedChannel]) {
        try {
          const response = await axios.get(`http://localhost:5000/api/messages/${selectedChannel}`);
          const newMessages = response.data;

          // Update local state with new messages for the selected channel
          onAddMessage(selectedChannel, newMessages);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };

    fetchMessages();
  }, [selectedChannel, messages, onAddMessage]);

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
  messages: PropTypes.object.isRequired,
  onAddMessage: PropTypes.func.isRequired,
};

export default MessageList;