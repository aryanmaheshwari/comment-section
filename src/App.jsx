import { useState } from 'react'
import Comment from './components/Comment'
import './App.css'
import NewCommentDialog from './components/NewCommentDialog';

function App() {
  const [comments, setComments] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [replyParentIndex, setReplyParentIndex] = useState(null);
 
  const addComment = (text) => {
    setComments((prev) => [
      ...prev,
      { index: Date.now(), commentText: text, replies: [] },
    ]);
  };

  const addReply = (commentsList, parentIndex, newReply) => {
    return commentsList.map((comment) => {
      if (comment.index === parentIndex) {
        return {
          ...comment,
          replies: [...comment.replies, newReply],
        };
      } else if (comment.replies.length > 0) {
        return {
          ...comment,
          replies: addReply(comment.replies, parentIndex, newReply),
        };
      } else {
        return comment;
      }
    });
  };

  const handlePost = (text) => {
    if (!text.trim()) return; // ignore empty

    if (replyParentIndex === null) {
      addComment(text);
    } else {
      const newReply = { index: Date.now(), commentText: text, replies: [] };
      setComments((prevComments) =>
        addReply(prevComments, replyParentIndex, newReply)
      );
    }
    setDialogOpen(false);
    setReplyParentIndex(null);
  };

  const handleNewThreadClick = () => {
    setReplyParentIndex(null);
    setDialogOpen(true);
  };

  const handleReplyClick = (index) => {
    setReplyParentIndex(index);
    setDialogOpen(true);
  };

  return (
    <div className='starting-buttons'>
      <div>
        <button onClick={handleNewThreadClick}>Start New Thread</button>
      </div>
      <div>
        {comments.map(({ index, commentText, replies }) => (
          <Comment
            key={index}
            commentText={commentText}
            replies={replies}
            index={index}
            onReplyClick={handleReplyClick}
          />
        ))}
      </div>
      {dialogOpen && (
        <NewCommentDialog onClose={() => setDialogOpen(false)} onPost={handlePost} />
      )}
    </div>
  )
}

export default App
