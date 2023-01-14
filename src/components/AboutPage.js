import React from 'react';
import '../App.css';



const AboutPage = () => {

  const textData = [
    {
      category: 'Data Sources 👩‍💻',
      text: 'Our data is sourced from the Twitter API, and is collected and analyzed using a combination of natural language processing techniques and machine learning algorithms, specifically, VADER.'
    },
    {
      category: 'VADER 🤖',
      text: 'To estimate the sentiment of tweets, we use the VADER (Valence Aware Dictionary and sEntiment Reasoner) package in Python. VADER is a lexicon and rule-based sentiment analysis tool that is specifically attuned to microblog-like contexts, such as Twitter. VADER is sensitive both the polarity and the intensity of sentiments expressed in social media contexts.'
    },
    {
      category: 'Polarity 🎭',
      text: 'Polarity in the context of sentiment analysis refers to the positive or negative nature of a statement or text. Polarity is scored on a scale of -1 to 1. -1 being negative, 0 being neutral, and 1 being positive'
    }
  ]

  return (
    <div className='mainContent alignCenter flexCol'>
        <div className="marginTop">
            {/* <h1>About Page</h1> */}
        </div>
        <div className="marginTop card padding textCardWidth">
          <h1>Introduction 👋</h1>
          <p>Welcome to our website, where we display tweet sentiment data visualizations. Our goal is to provide a clear and easy-to-use platform for exploring and analyzing current public opinion on Twitter. This site was heavily inspired by the amazing tweet sentiment visuzalizer <a href="https://www.csc2.ncsu.edu/faculty/healey/tweet_viz/tweet_app/" target="_blank" rel="noopener noreferrer">web app</a> by Healy & Ramaswamy at NCSU.</p>
        </div>
        {
          textData.map((value) => (
            <div className="marginTop card padding textCardWidth">
            <h1>{value.category}</h1>
            <p>{value.text}</p>
          </div>
          ))
        }
        <div className="marginTop card padding textCardWidth">
          <h1>Credits 🎥</h1>
          <p>
            <ul>
              <li>
                <a href="https://www.csc2.ncsu.edu/faculty/healey/tweet_viz/" target="_blank" rel="noopener noreferrer">Sentiment Viz</a>
              </li>
              <li>
                <a href="https://github.com/cjhutto/vaderSentiment" target="_blank" rel="noopener noreferrer">VADER-Sentiment-Analysis</a>
              </li>
              <li>
                <a href="https://www.tweepy.org/" target="_blank" rel="noopener noreferrer">Tweepy</a>
              </li>
            </ul>
          </p>
        </div>

    </div>
  )
}

export default AboutPage