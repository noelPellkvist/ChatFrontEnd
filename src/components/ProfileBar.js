import React from 'react';
import './ProfileBar.css';

function ProfileBar({ user, inCall }) {
  return (
    <div className="profileBar">
      <div className="profileInfo">
        <img src={user.avatar} alt="avatar" className="avatar" />
        <div className="userText">
          <div className="username">{user.name}</div>
          <div className="status">{user.status}</div>
        </div>
      </div>

      <div className="profileActions">
        {inCall && (
          <>
            <button className="iconButton">🎙️</button>
            <button className="iconButton">🎧</button>
          </>
        )}
        <button className="iconButton">⚙️</button>
      </div>
    </div>
  );
}

export default ProfileBar;
