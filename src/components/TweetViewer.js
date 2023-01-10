import React from 'react';
import '../App.css';

const TweetViewer = (props) => {
    // Destructure props
    const { tweet } = props;

    console.log(tweet)
  return (
    <div className='tweetViewerContainer flex'>
        <p>{tweet.timestamp}</p>
        <p>{tweet.tweet}</p>
    </div>
  )
}

export default TweetViewer