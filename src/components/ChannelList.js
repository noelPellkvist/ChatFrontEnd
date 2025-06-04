import React from 'react';
import './ChannelList.css';

function ChannelList({ selectedChannel, setSelectedChannel }) {
  const server = {
    name: 'My Server',
    iconUrl: 'https://i.pravatar.cc/40?img=12' // Replace with your server‐icon URL
  };

  const textChannels = ['general', 'memes', 'gaming'];
  const voiceChannels = ['Voice 1', 'Voice 2'];

  return (
    <div className="channelList">
      {/* ─── Server Header ───────────────────────────── */}
      <div className="serverHeader">
        <img src={server.iconUrl} alt="Server Icon" className="serverIcon" />
        <span className="serverName">{server.name}</span>
      </div>

      {/* ─── Text Channels Section ───────────────────── */}
      <div className="section">
        <h4>TEXT CHANNELS</h4>
        {textChannels.map(channel => (
          <div
            key={channel}
            className={`channel ${selectedChannel === channel ? 'active' : ''}`}
            onClick={() => setSelectedChannel(channel)}
          >
            # {channel}
          </div>
        ))}
      </div>

      {/* ─── Voice Channels Section ──────────────────── */}
      <div className="section">
        <h4>VOICE CHANNELS</h4>
        {voiceChannels.map(channel => (
          <div
            key={channel}
            className={`channel ${selectedChannel === channel ? 'active' : ''}`}
            onClick={() => setSelectedChannel(channel)}
          >
            🔊 {channel}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChannelList;
