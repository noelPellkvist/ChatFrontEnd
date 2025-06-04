// src/components/ChatView.js
import React, { useState } from 'react';
import './ChatView.css';

// Example “hard-coded” messages. Each has a reactions array and we’ll add
// a replyToId to the state later.
const initialMessages = [
  {
    id: 1,
    user: {
      name: 'Papanoel1337',
      avatar: 'https://i.pravatar.cc/40?img=47',
    },
    timestamp: new Date('2025-06-04T16:23:00'),
    content: 'tyvärr inte än',
    reactions: [],
  },
  {
    id: 2,
    user: {
      name: 'Papanoel1337',
      avatar: 'https://i.pravatar.cc/40?img=47',
    },
    timestamp: new Date('2025-06-04T16:24:30'),
    content: 'theresia kommer hit om 20, ska snacka med henne då o laga mat till henne',
    reactions: [],
  },
  {
    id: 3,
    user: {
      name: 'Papanoel1337',
      avatar: 'https://i.pravatar.cc/40?img=47',
    },
    timestamp: new Date('2025-06-04T16:25:45'),
    content: 'se om jag har tid',
    reactions: [],
  },
  {
    id: 4,
    user: {
      name: 'Papanoel1337',
      avatar: 'https://i.pravatar.cc/40?img=47',
    },
    timestamp: new Date('2025-06-04T16:26:10'),
    content: 'men hör av mig om max en timme',
    reactions: [],
  },
  {
    id: 5,
    user: {
      name: 'AnotherUser',
      avatar: 'https://i.pravatar.cc/40?img=12',
    },
    timestamp: new Date('2025-06-04T16:40:00'),
    content: 'This is a separate user sending a message.',
    reactions: [],
  },
  {
    id: 6,
    user: {
      name: 'AnotherUser',
      avatar: 'https://i.pravatar.cc/40?img=12',
    },
    timestamp: new Date('2025-06-04T16:43:00'),
    content: 'Second message from AnotherUser within five minutes.',
    reactions: [],
  },
];

export default function ChatView({ channel }) {
  const [messages, setMessages] = useState(initialMessages);
  const [hoveredMessageId, setHoveredMessageId] = useState(null);

  // NEW: track which message is being replied to (id or null)
  const [replyToId, setReplyToId] = useState(null);

  // Format a Date object as “HH:MM”
  const formatTime = (d) => {
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  };

  // Add a reaction emoji to a message (unchanged)
  const addReaction = (messageId, emoji) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId
          ? { ...m, reactions: [...m.reactions, emoji] }
          : m
      )
    );
  };

  // A small list of emojis to choose from (unchanged)
  const emojiOptions = ['👍', '😂', '❤️', '😮', '😢', '👏'];

  // When the user clicks “Reply” on a message:
  // store that message’s id in state
  const onReplyClick = (messageId) => {
    setReplyToId(messageId);
  };

  // Find the message object for `replyToId` so we can show its snippet
  const messageBeingRepliedTo = messages.find((m) => m.id === replyToId) || null;

  return (
    <div className="chatView">
      {/* ─── Header ─────────────────────────────────────── */}
      <div className="chatHeader">
        <h2>#{channel}</h2>
      </div>

      {/* ─── Messages ──────────────────────────────────── */}
      <div className="chatMessages">
        {messages.map((msg, idx) => {
          const prev = messages[idx - 1];
          const next = messages[idx + 1];

          // 1) Do we “clump” with the previous?
          const isClumped =
            prev &&
            prev.user.name === msg.user.name &&
            msg.timestamp - prev.timestamp <= 5 * 60 * 1000;

          // 2) Is the next message also in this clump?
          const nextIsClumped =
            next &&
            next.user.name === msg.user.name &&
            next.timestamp - msg.timestamp <= 5 * 60 * 1000;

          // 3) Set margin-bottom: 2px if next is clumped, otherwise 16px
          const marginBottom = nextIsClumped ? '2px' : '16px';

          // 4) Show emoji picker whenever this message is hovered
          const isPickerVisible = hoveredMessageId === msg.id;

          return (
            <div
              key={msg.id}
              className={`messageItem${isClumped ? ' clumped' : ''}`}
              style={{ marginBottom }}
              onMouseEnter={() => setHoveredMessageId(msg.id)}
              onMouseLeave={() => setHoveredMessageId(null)}
            >
              {/* Avatar + Meta only if NOT clumped */}
              {!isClumped && (
                <img
                  className="messageAvatar"
                  src={msg.user.avatar}
                  alt={`${msg.user.name} avatar`}
                />
              )}

              <div
                className="messageContent"
                style={{ marginLeft: isClumped ? '52px' : '0' }}
              >
                {!isClumped && (
                  <div className="messageMeta">
                    <span className="messageUsername">{msg.user.name}</span>
                    <span className="messageTimestamp">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                )}

                <div className="messageBody">
                  <div className="messageText">{msg.content}</div>

                  {/* Render existing reactions */}
                  {msg.reactions.length > 0 && (
                    <div className="reactions">
                      {msg.reactions.map((r, i) => (
                        <span key={i} className="reaction">
                          {r}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* ─── Actions (emoji picker + reply) ────────────────────────── */}
              <div className="messageActions">
                {isPickerVisible && (
                  <div className="emojiPicker">
                    {/* Emoji list */}
                    <div className="emojiList">
                      {emojiOptions.map((emo) => (
                        <span
                          key={emo}
                          className="emojiOption"
                          onClick={() => addReaction(msg.id, emo)}
                        >
                          {emo}
                        </span>
                      ))}
                    </div>
                    
                    {/* Divider */}
                    <div className="pickerDivider">|</div>
                    
                    {/* Reply button */}
                    <span
                      className="replyButton"
                      onClick={() => onReplyClick(msg.id)}
                      title="Reply to this message"
                    >
                      ↩️
                    </span>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* ─── “Replying to …” Banner (only if replyToId is set) ─────── */}
      {messageBeingRepliedTo && (
        <div className="replyBanner">
          <div className="replyInfo">
            <strong>{messageBeingRepliedTo.user.name}</strong>:
            <span className="replySnippet">
              {' '}
              {messageBeingRepliedTo.content.slice(0, 50)}
              {messageBeingRepliedTo.content.length > 50 && '…'}
            </span>
          </div>
          <span
            className="cancelReply"
            onClick={() => setReplyToId(null)}
            title="Cancel reply"
          >
            ×
          </span>
        </div>
      )}

      {/* ─── Input Bar ───────────────────────────────────── */}
      <div className="chatInput">
        <input
          type="text"
          placeholder={
            messageBeingRepliedTo
              ? `Replying to ${messageBeingRepliedTo.user.name}…`
              : `Message #${channel}`
          }
        />
      </div>
    </div>
  );
}
