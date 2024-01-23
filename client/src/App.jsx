import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ChannelList from './components/ChannelList';
import MessageList from './components/MessageList';
import Editor from './components/Editor';

import Loader from './components/Loader';

function App() {
    // Main app component logic here

    const [channelsBackendData, setBackendData] = useState([]);
    const [isReady, setReady] = useState(false);
    const [selectedChannel, setSelectedChannel] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/channels')
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

    return (
        <div className='app-container'>
            {isReady ? (
                <div className='app-content'>
                    <ChannelList
                        channels={channelsBackendData}
                        onSelectChannel={onSelectChannel}
                    />
                    <div className='messages-container'>
                        <MessageList selectedChannel={selectedChannel} />
                        <Editor selectedChannel={selectedChannel} />
                    </div>
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
}

export default App;
