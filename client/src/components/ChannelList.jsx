import React from 'react';
import PropTypes from 'prop-types';
import './ChannelList.css';

const ChannelList = ({ channels, onSelectChannel, selectedChannel }) => {
    return (
        <div className='channel-list'>
            <h2>Channels</h2>
            <ul>
                {channels.map((channel) => (
                    <li
                        key={channel}
                        onClick={() => onSelectChannel(channel)}
                        className={channel.toLowerCase() === selectedChannel ? 'active' : ''}
                    >
                        {channel}
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Prop types validation
ChannelList.propTypes = {
    channels: PropTypes.array.isRequired,
    onSelectChannel: PropTypes.func.isRequired,
    selectedChannel:PropTypes.string.isRequired
};

export default ChannelList;
