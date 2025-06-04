// src/components/VoiceChatView.js
import React from 'react';
import VoiceParticipantCard from './voicechat/VoiceParticipantCard';
import './VoiceChatView.css';

export default function VoiceChatView({ channel }) {
  // Example participants – replace with your real data:
  const participants = [
    { id: 1, name: 'BlueTood',    avatar: 'https://i.pravatar.cc/100?img=47', bgColor: '#7e6d75' },
    { id: 2, name: 'mackan_blizz',avatar: 'https://i.pravatar.cc/100?img=12', bgColor: '#3b0201' },
    { id: 3, name: 'Mariana LLC', avatar: 'https://i.pravatar.cc/100?img=65', bgColor: '#c89224' },
    { id: 5, name: 'Mariana LLC2', avatar: 'https://i.pravatar.cc/100?img=65', bgColor: '#c89224' },
    { id: 4, name: 'Mariana LLC3', avatar: 'https://i.pravatar.cc/100?img=65', bgColor: '#c89224' },
    // Uncomment/add a 4th to see 2×2 behavior, or keep 3 to see centering logic for 3×3:
    // { id: 4, name: 'ExtraUser', avatar: 'https://i.pravatar.cc/100?img=5', bgColor: '#1f2c3d' },
  ];

  const count = participants.length;
  const gridSize = Math.ceil(Math.sqrt(count)); // e.g., 3 participants → gridSize = 2 (2×2)
  const totalCells = gridSize * gridSize;

  // Build an array of length totalCells, initialized to null placeholders
  const cells = Array(totalCells).fill(null);

  if (count === 1) {
    // Only one participant → place them in center cell
    const centerIndex = Math.floor(totalCells / 2);
    cells[centerIndex] = participants[0];
  } else {
    // More than one participant:
    // Determine how many go into full rows: Math.floor(count / gridSize) * gridSize
    // Remainder = count % gridSize (how many in last row)
    const fullRows = Math.floor(count / gridSize);
    const remainder = count % gridSize;

    if (remainder === 1) {
      // Exactly one in final row → place that single one in middle column of last row
      // Fill all but the last participant in normal row-major order
      participants.slice(0, count - 1).forEach((p, i) => {
        cells[i] = p;
      });
      // Compute index of “middle column of last row”
      // The last row starts at index = fullRows * gridSize
      const lastRowStart = fullRows * gridSize;
      const middleCol = Math.floor(gridSize / 2); // zero-based column
      const centerIndex = lastRowStart + middleCol;
      cells[centerIndex] = participants[count - 1];
    } else {
      // Normal case (last row has >1 participants): just fill left-to-right, top-to-bottom
      participants.forEach((p, i) => {
        cells[i] = p;
      });
    }
  }

  return (
    <div className="voiceChatView">
      {/* ─── Header ─────────────────────────────────── */}
      <div className="voiceHeader">
        <div className="voiceTitle">
          <span className="voiceIcon">🔊</span>
          <span className="channelName">{channel.toUpperCase()}</span>
        </div>
        <div className="voiceSubtitle">
          “Mellan Smårgås” – Mackan 2025. Also Emilia tant{' '}
          <span className="editIcon">✏️</span>
        </div>
        <div className="voiceHeaderActions">
          <span className="chatIcon">💬</span>
        </div>
      </div>

      {/* ─── Participant Grid ─────────────────────────── */}
      <div
        className="participantGrid"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {cells.map((cell, idx) => {
          if (cell) {
            // It's a participant object, render the card
            return (
              <VoiceParticipantCard
                key={cell.id}
                name={cell.name}
                avatar={cell.avatar}
                bgColor={cell.bgColor}
              />
            );
          } else {
            // Placeholder cell
            return <div key={`blank-${idx}`} className="participantPlaceholder" />;
          }
        })}
      </div>

      {/* ─── Footer Controls ────────────────────────── */}
      <div className="voiceControls">
        <button className="controlBtn">🎤</button>
        <button className="controlBtn">🔈</button>
        <button className="controlBtn">🖥️</button>
        <button className="controlBtn">🎮</button>
        <button className="controlBtn">🖐️</button>
        <button className="endCallBtn">📞</button>
        <button className="controlBtn">⬜</button>
      </div>
    </div>
  );
}
