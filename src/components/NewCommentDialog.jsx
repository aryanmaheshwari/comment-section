import React, { useState } from "react";
import "./Comment.css";

export default function NewCommentDialog({ onClose, onPost }) {
  const [text, setText] = useState("");

  const handlePost = () => {
    if (text.trim()) {
      onPost(text.trim());
      setText("");
    }
  };

  return (
    <div className="new-comment-dialog">
      <div className="dialog-box">
        <textarea
          placeholder="Write your comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="dialog-buttons">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handlePost}>Post</button>
        </div>
      </div>
    </div>
  );
}
