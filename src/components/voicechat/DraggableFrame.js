// src/components/voicechat/DraggableFrame.js
import React, { useState, useRef, useEffect } from 'react';
import './DraggableFrame.css';

/**
 * Props:
 *   - children: the content to render inside the floating box (e.g. <video> or <VoiceParticipantCard />)
 *   - onDoubleClick: callback to run when the user double‐clicks the frame
 *   - initialPosition: { x: number, y: number } – where to place the frame initially
 */
export default function DraggableFrame({
  children,
  onDoubleClick,
  initialPosition = { x: 20, y: 20 },
}) {
  const frameRef = useRef(null);

  // We track the frame’s top/left in state.
  const [position, setPosition] = useState({
    x: initialPosition.x,
    y: initialPosition.y,
  });

  // Whether we’re currently dragging:
  const [dragging, setDragging] = useState(false);

  // Store the offset (mouse position relative to frame’s top-left) when drag starts:
  const offset = useRef({ x: 0, y: 0 });

  // onMouseDown handler – start dragging
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // only left‐click
    const rect = frameRef.current.getBoundingClientRect();
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setDragging(true);
    e.stopPropagation();
    e.preventDefault();
  };

  // onMouseMove (on document) – update position while dragging
  const handleMouseMove = (e) => {
    if (!dragging) return;
    const newX = e.clientX - offset.current.x;
    const newY = e.clientY - offset.current.y;
    setPosition({
      x: Math.max(0, newX), // keep it from going off‐left
      y: Math.max(0, newY), // keep it from going off‐top
    });
    e.preventDefault();
  };

  // onMouseUp – stop dragging
  const handleMouseUp = (e) => {
    if (dragging) {
      setDragging(false);
      e.preventDefault();
    }
  };

  // Whenever “dragging” changes, attach or remove document‐level mousemove/mouseup
  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  return (
    <div
      ref={frameRef}
      className="draggableFrame"
      onMouseDown={handleMouseDown}
      onDoubleClick={onDoubleClick}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      {children}
    </div>
  );
}
