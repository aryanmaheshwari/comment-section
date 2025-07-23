import React, {useEffect, useState} from "react";
import './Comment.css';

export default function Comment({parent, index}) {
    
    const[replies, setReplies] = useState([]);
    const[showReplies, setShowReplies] = useState(true);

    const hasParent = parent?.length !== 0;

    const addReply = () => {
        setShowReplies(true);
        replies.push(<Comment parent={index} />);
        setReplies(() => {return [...replies]});
    }

    return(
        <div className={`comment-container ${hasParent ? "child" : "parent"}`}>
            <div className="comment-title">
                {!hasParent ? <h1>Hi</h1> : <p>Response</p>}
            </div>
            <div className="comment-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil blanditiis enim qui animi nostrum facere, dolorum perferendis deleniti. Autem sint itaque rem libero officiis! Sequi ab non quidem iste officiis.
            </div>
            <div className="comment-actions">
                <button onClick={addReply}>Reply</button>
                    {replies?.length ? <button onClick={() => setShowReplies(() => {
                                            return !showReplies
                                        })}>{showReplies ? "Hide" : "Show"}</button> : null}
            </div>
            {showReplies && <div className="comment-replies">
                {replies}
            </div>}
        </div>
    )
}