import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChannelList from './components/ChannelList';
import ChatView from './components/ChatView';
import ProfileBar from './components/ProfileBar';
import './index.css';

function App() {
  const [selectedChannel, setSelectedChannel] = useState('general');
  const [inCall, setInCall] = useState(false);

  const user = {
    name: 'Papanoel1337',
    status: 'Invisible',
    avatar: 'https://i.pravatar.cc/100' // Example avatar URL, replace with your own!
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="mainColumn">
        <ChannelList selectedChannel={selectedChannel} setSelectedChannel={setSelectedChannel} />
        <ProfileBar user={user} inCall={inCall} />
      </div>
      <ChatView channel={selectedChannel} />
    </div>
  );
}

export default App;
