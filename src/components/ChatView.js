// src/components/ChatView.js
import React, { useState, useRef, useEffect } from 'react';
import './ChatView.css';

export default function ChatView({ channel }) {
  const [messages, setMessages] = useState([
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
      content:
        'theresia kommer hit om 20, ska snacka med henne då o laga mat till henne',
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
  ]);

  const [hoveredMessageId, setHoveredMessageId] = useState(null);
  const [replyToId, setReplyToId] = useState(null);

  // NEW: controlled textarea value
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef(null);

  // Format a Date object as “HH:MM”
  const formatTime = (d) => {
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  };

  // NEW: auto‐resize the textarea whenever inputValue changes
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      if (inputValue === '') {
        // If empty, let CSS/rows=1 make it one line only
        ta.style.height = 'auto';
      } else {
        // Otherwise, grow to fit all lines
        ta.style.height = 'auto';
        ta.style.height = ta.scrollHeight + 'px';
      }
    }
  }, [inputValue]);

  // NEW: Handle Enter key (without Shift) to “send” the chat
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      alert('sent a chat');
      setInputValue('');
      // The useEffect above will reset the textarea’s height to auto and then shrink it
    }
  };

  // Add a reaction emoji to a message
  const addReaction = (messageId, emoji) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId ? { ...m, reactions: [...m.reactions, emoji] } : m
      )
    );
  };

  const emojiOptions = ['👍', '😂', '❤️', '😮', '😢', '👏'];

  const onReplyClick = (messageId) => {
    setReplyToId(messageId);
  };

  const messageBeingRepliedTo =
    messages.find((m) => m.id === replyToId) || null;

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

          const isClumped =
            prev &&
            prev.user.name === msg.user.name &&
            msg.timestamp - prev.timestamp <= 5 * 60 * 1000;
          const nextIsClumped =
            next &&
            next.user.name === msg.user.name &&
            next.timestamp - msg.timestamp <= 5 * 60 * 1000;

          const marginBottom = nextIsClumped ? '2px' : '16px';
          const isPickerVisible = hoveredMessageId === msg.id;

          return (
            <div
              key={msg.id}
              className={`messageItem${isClumped ? ' clumped' : ''}`}
              style={{ marginBottom }}
              onMouseEnter={() => setHoveredMessageId(msg.id)}
              onMouseLeave={() => setHoveredMessageId(null)}
            >
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

              <div className="messageActions">
                {isPickerVisible && (
                  <div className="emojiPicker">
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
                    <div className="pickerDivider">|</div>
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

      {/* ─── “Replying to …” Banner (if replying) ─────── */}
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

      {/* ─── Input Bar (textarea that grows upward) ───────────────────── */}
      <div className="chatInput">
        <textarea
          ref={textareaRef}
          rows={1}                           // start at one line exactly
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Message #${channel}`}
        />
      </div>
    </div>
  );
}
