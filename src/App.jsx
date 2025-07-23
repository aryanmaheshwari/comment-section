import { useState } from 'react'
import Comment from './components/Comment'
import './App.css'

function App() {
  const[comments,setComments] = useState([]);
 
  const addComment = () => {
    comments.push(<Comment parent={[]}/>);
    setComments(() => {
      return [...comments];
    });
  }

  return (
    <div className='starting-buttons'>
      <div>
        <button onClick={addComment}>Start New Thread</button>
      </div>
      <div>
        {
          comments
        }
      </div>
    </div>
  )
}

export default App
