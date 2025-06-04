// src/App.js
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChannelList from './components/ChannelList';
import ChatView from './components/ChatView';
import VoiceChatView from './components/VoiceChatView'; // ← NEW
import ProfileBar from './components/ProfileBar';
import './index.css';

function App() {
  const [selectedChannel, setSelectedChannel] = useState('general');
  const [inCall, setInCall] = useState(false);

  const user = {
    name: 'Papanoel1337',
    status: 'Invisible',
    avatar: 'https://i.pravatar.cc/100'
  };

  // Helper: detect if the channel string corresponds to voice
  const isVoiceChannel = selectedChannel.startsWith('Voice');

  return (
    <div className="app">
      <Sidebar />

      <div className="mainColumn">
        <ChannelList
          selectedChannel={selectedChannel}
          setSelectedChannel={setSelectedChannel}
        />
        <ProfileBar user={user} inCall={inCall} />
      </div>

      {/* ─── Conditional rendering for Text vs. Voice ─────────────────── */}
      {isVoiceChannel ? (
        <VoiceChatView channel={selectedChannel} />
      ) : (
        <ChatView channel={selectedChannel} />
      )}
    </div>
  );
}

export default App;
