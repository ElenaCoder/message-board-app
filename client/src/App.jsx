import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ChannelList from './components/ChannelList';
import MessageList from './components/MessageList';
import Editor from './components/Editor';

import Loader from './components/Loader';

function App() {
    // Main app component logic here

    const [channels, setBackendData] = useState([]);
    const [isReady, setReady] = useState(false);
    const [selectedChannel, setSelectedChannel] = useState('');
    const [messages, setMessages] = useState({});

    useEffect(() => {
        axios
            .get('http://localhost:5000/channels')
            .then((response) => {
                setBackendData(response.data);
                setReady(true);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const onSelectChannel = (channel) => {
        setSelectedChannel(channel.toLowerCase());
    };

    // Callback function to add a new message to the local state
    const onAddMessage = (channel, newMessages) => {
        const formattedMessages = Array.isArray(newMessages)
            ? newMessages
            : [{ text: newMessages }];

        setMessages((prevMessages) => ({
            ...prevMessages,
            [channel]: Array.isArray(prevMessages[channel])
                ? [...prevMessages[channel], ...formattedMessages]
                : [...formattedMessages],
        }));
    };

    return (
        <div className='app-container'>
            {isReady ? (
                <div className='app-content'>
                    <ChannelList
                        channels={channels}
                        onSelectChannel={onSelectChannel}
                        selectedChannel={selectedChannel}
                    />
                    <div className='messages-container'>
                        <MessageList
                            selectedChannel={selectedChannel}
                            messages={messages}
                            onAddMessage={onAddMessage}
                        />
                        <div
                            className={`editor-wrapper ${
                                selectedChannel ? 'visible' : ''
                            }`}
                        >
                            <Editor
                                selectedChannel={selectedChannel}
                                onAddMessage={onAddMessage}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
}

export default App;
