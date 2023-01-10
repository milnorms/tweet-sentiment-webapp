import React from 'react';
import '../App.css';
import TweetViewer from './TweetViewer';
// import LoadingSpinner from '../assets/images/loading_spinner.svg'

// Package to embed tweets based on ID. Ref: https://www.npmjs.com/package/react-twitter-embed
// import { TwitterTweetEmbed } from 'react-twitter-embed';


const TweetPage = (props) => {
// Loading in vars from props
const {isFirstLoad, term, jsonData } = props;

// CONSTANTS

// Configurations for tweet embed component. Ref: https://developer.twitter.com/en/docs/twitter-for-websites/embedded-tweets/guides/embedded-tweet-parameter-reference
const tweetEmbedOptions = {height: 250, conversation: 'none', cards: 'hidden'}

// Setting default variables with empty data
let topTweets = {
    posTweet: '',
    negTweet: ''
}

// Helper functions
const getTopTweets = (resJson) => {
// Sorting twees by polarity in descending order
const sorted = resJson['sentiment'].sort((a, b) => (a.polarity < b.polarity) ? 1 : -1)

return {
    posTweet: sorted[0],
    negTweet: sorted[sorted.length - 1]
}}

const initDataLoad = () => {
    topTweets = getTopTweets(jsonData)
}
// Main Execution for loaded data
if (!isFirstLoad) {
    initDataLoad()
}
  return (
    <div className='mainContent alignCenter flexCol'>
        <div className="marginTop">
            <h1>Top Tweets</h1>
        </div>

        <div className="tweetEmbedContainer flexRow marginTop">
            <div className="tweetEmbed">
                <h2>👍 Most Positive Tweet:</h2>

                {
                    (!isFirstLoad) ? 
                    (  
                        <>  
                        <TweetViewer tweet={topTweets.posTweet}></TweetViewer>
                        </>) : 
                        (<></>)
                }

            </div>
            <div className="tweetEmbed">
                <h2>👎 Most Negative Tweet:</h2>
                {
                    (!isFirstLoad) ? 
                    (  
                        <>     
                            <TweetViewer tweet={topTweets.negTweet}></TweetViewer>
                        </>) : 
                        (<></>)
                }

            </div>

        </div>

    </div>
  )
}

export default TweetPage