import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'; // Import PropTypes
import './Editor.css';

const Editor = ({ selectedChannel }) => {
  const [message, setMessage] = useState('');

  const onAddMessage = async () => {
    if (!message || !selectedChannel) {
      // Handle invalid input or channel
      return;
    }

    try {
      // Send the new message to the server
      await axios.post(`http://localhost:5000/api/messages/${selectedChannel}`, { text: message });

      // Clear the input field after submission
      setMessage('');
    } catch (error) {
      console.error('Error adding message:', error);
    }
  };

  return (
    <div className="editor-container">
      <div className="editor">
        <textarea
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button disabled={!message} onClick={onAddMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

// Add PropTypes validation
Editor.propTypes = {
  selectedChannel: PropTypes.string.isRequired,
};

export default Editor;