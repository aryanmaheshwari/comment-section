import React, { useState } from "react";
import "./Comment.css";

export default function Comment({ commentText, replies = [], index, onReplyClick, parent }) {
  const [showReplies, setShowReplies] = useState(true);

  const hasParent = parent !== undefined && parent !== null;

  return (
    <div className={`comment-container ${hasParent ? "child" : "parent"}`}>
      <div className="comment-text">{commentText}</div>
      <div className="comment-actions">
        <button onClick={() => onReplyClick(index)}>Reply</button>
        {replies.length > 0 && (
          <button onClick={() => setShowReplies((prev) => !prev)}>
            {showReplies ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {showReplies && replies.length > 0 && (
        <div className="comment-replies">
          {replies.map((reply) => (
            <Comment
              key={reply.index}
              commentText={reply.commentText}
              replies={reply.replies}
              index={reply.index}
              parent={index}
              onReplyClick={onReplyClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
