// src/components/voicechat/VoiceParticipantCard.js
import React from 'react';
import './VoiceParticipantCard.css';

/**
 * Props:
 *   - name: string (participant’s display name)
 *   - avatar: string (URL for the avatar image)
 *   - bgColor: string (CSS color for the card’s background)
 */
export default function VoiceParticipantCard({ name, avatar, bgColor }) {
  return (
    <div
      className="voiceParticipantCard"
      style={{ backgroundColor: bgColor }}
    >
      <img
        className="participantAvatar"
        src={avatar}
        alt={`${name} avatar`}
      />
      <div className="participantNameTag">{name}</div>
    </div>
  );
}
