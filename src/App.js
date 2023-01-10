import './App.css';
import React, { useState } from 'react';

// Importing Page components
import SentimentPage from './components/SentimentPage';
import WordCloudPage from './components/WordCloudPage';
import TweetPage from './components/TweetPage';
import AboutPage from './components/AboutPage';
import Navbar from './components/Navbar';
import Csv from './components/Csv';

// Library imports
// Icons: https://fontawesome.com/icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

// Config
// Component.js
import { config } from './Constants'


  /* 
    TODO:
    [] PAGES
      [] **ALL**
        [X] fix error handling
        [X] add loading spinner
      [] **tweetpage**
        [] add css classes
        [] change top tweet page to page with line graph of all tweets and sentimenta
        [] create tooltips for graph that contain raw tweet content and sentiment value by color (pos, neg, neu)
      [] ***about Page***
        [] add formating
        [] add content
          [] research sentiment analyzer. eg ref: https://www.danielsoper.com/sentimentanalysis/default.aspx
          [] research vader
          [] explain limitations of data and how data is sourced (tweepy api, tweets from 7 days etc)
          [] explain stack (python to retrieve and process tweets, sanic server, react frontend)
        [] styling
    [] SEARCH AREA 
      [X] create csv download button
      [X] convert json to csv functionality. ref: https://stackoverflow.com/questions/8847766/how-to-convert-json-to-csv-format-and-store-in-a-variable
      [X] csv needs to match example.csv found in server folder
    [] MISC
      [] add tooltip on hover to explain certain elements. eg. 'wordcloud page top n words: (exclu. search term(s))'
      [] seperate app.css into files for each page
    [] STYLING
      [X] change font?
      [] use floating card design

  */


function App() {

  // Constants

  // Mapping the search type label text with the correct url enocded string
  const SEARCH_TYPE_LOOKUP = {
    'Plain Search' : '',
    'By User' : 'from:',
    'By Tweets to a User': '@',
    'By Hashtag': '%23'
  }

  // API URL
  const HOST = config.url.API_URL

  // Dev api
  // const HOST = 'http://0.0.0.0:8000'

  // Hostname of API
  // HOST = 'https://tweet-sentiment-analysis-api-1h12-main-magw6pcwcq-wm.a.run.app'



  // Number of tweets to be retrieved
  const NUM_ITEMS = 100;

  // Number of wordcount words to be retrived
  const NUM_WORDCOUNT = Math.round(NUM_ITEMS / 2);

  // CSS classes & ids
  const senPageId = 'senPage'
  const wcPageId = 'wcPage'
  const tweetPageId = 'tweetPage'
  const aboutPageId = 'abPage'

  // States

  // JSON data from API
  const [tweetData, setTweetData] = useState({});

  // Form states
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchTypeLabel, setSearchTypeLabel] = useState('Keyword');

  // Display states

  // State to display the final search term
  const [displayedSearchTerm, setDisplayedSearchTerm] = useState('')

  // Loading states
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  // Error States
  const [isError, setIsError] = useState(false);

  // Page View state
  const [currentPageId, setCurrentPageId] = useState(senPageId)

  // Functions

  // HTML event handling funcitons
  const handlePageClick = (event) => {

    setCurrentPageId(event.target.id)
  }

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value)
  }

  const handleChangeType = (event) => {
    event.preventDefault()
    console.log('select change', event.target.value)

    // Setting label text based on search type
    if (event.target.value.toLowerCase().includes('user')) {
      setSearchTypeLabel('Username')
    } 
    else if (event.target.value.toLowerCase().includes('hashtag')) {
      setSearchTypeLabel('#')
    } else {
      setSearchTypeLabel('Keyword')
    }

    setSearchType(SEARCH_TYPE_LOOKUP[event.target.value])
  }

  // Fetch data from api when submit button is pressed
  const handleSubmit = async (event) => {
    // Preventing the window from refreshing on submit
    event.preventDefault();

    // Constructing search term to use as url params for API
    const searchTerm = `${searchType}${searchInput.replace(' ', '+')}`

    // Setting states
    // Clearing tweet data
    setTweetData({})
    // Setting first load
    setIsFirstLoad(false)
    // Now data is loading
    setIsLoading(true)

    // console.log(`Submitting: ${searchTerm}`)

    // Fetching data from api
    try {
      let res = await fetch(`${HOST}/api?t=${searchTerm}&n=${NUM_ITEMS}&w=${NUM_WORDCOUNT}`);
      let resJson = await res.json();

        if (res.ok) {
        console.log(resJson)
        // Setting states AFTER data load
        setTweetData(resJson)
        setIsError(false)
        setIsLoading(false)
        // Setting final search term to be displayed
        setDisplayedSearchTerm(`${searchTypeLabel === '#' ? searchTypeLabel : searchTypeLabel + ': '}${searchInput} (${resJson.sentiment.length} tweets)`)

      } else {
        throw new Error(`${res.status} ${res.statusText}`);
      }
    } catch (error) {
      console.log(error)
      setIsError(true)
    }
  }


  return (
    <div className='mainContainer'>
      <div className="title flexRow justifyCenter alignCenter">
      <FontAwesomeIcon icon={faTwitter} size="2x"/>
        <h1>Current Tweet Sentiment</h1>
      </div>

      <div className="searchArea flexRow alignCenter">
        {/* <h3 className='displayedSearchTerm'>{displayedSearchTerm === '' ? '' : `✨${displayedSearchTerm}✨`}</h3> */}
        <div className="searchForm">
          <form onSubmit={handleSubmit}>

            <div className="searchInputsContainer">
                {/* <label htmlFor="searchType"> Search Type:</label> */}
                  <select className="searchTypeSel" name="searchType" onChange={handleChangeType}>
                    {
                      Object.keys(SEARCH_TYPE_LOOKUP).map((searchTypeKey, i) => (
                        <option value={searchTypeKey} key={i}>{searchTypeKey}</option>
                      ))
                    }
                  </select>
                {/* <label htmlFor="searchInput">{searchTypeLabel}:</label> */}
                <div className="searchBarContainer">
                {/* https://codepen.io/priyesh-diukar/pen/qqXyKx */}
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                  <input className="searchBar" name="searchInput" placeholder={searchTypeLabel} value={searchInput} onChange={handleSearchInput}></input>
                </div>
            </div>
            <input className='searchSubmit' type="submit" value={'Search'}/>
            <Csv isFirstLoad={isFirstLoad} isLoading={isLoading} searchInput={searchInput} jsonData={tweetData}/>
          </form>
          
        </div>

      </div>

      <Navbar currentPageId={currentPageId} senPageId={senPageId} wcPageId={wcPageId} tweetPageId={tweetPageId} aboutPageId={aboutPageId} handlePageClick={handlePageClick}></Navbar>

      {/* <div className="mainHeaderContainer">
        <h1>Main header</h1>
      </div> */}
      
      {
        (isError) ? (
          <h2>An error has occurred.</h2>
        ) : (
              // If data has NOT been loaded
              // (typeof tweetData.sentiment === 'undefined') 
              // If data has NOT been loaded
              (isLoading) ? (

                (isFirstLoad) ? (
                  // On FIRST load, display a blank chart
                  (currentPageId === senPageId) ? (
                    <SentimentPage isFirstLoad={isFirstLoad} term={displayedSearchTerm} jsonData={tweetData} />
                  ) : (
                    (currentPageId === wcPageId) ? (
                      <WordCloudPage isFirstLoad={isFirstLoad} term={displayedSearchTerm} jsonData={tweetData} />
                      ) :
                    (currentPageId === tweetPageId) ? (
                      <TweetPage isFirstLoad={isFirstLoad} term={displayedSearchTerm} jsonData={tweetData} />
                    ) :                     
                    (currentPageId === aboutPageId) ? (
                      <AboutPage />
                    ) : (
                      <></>
                    )
                  )

                  
                ) : (
                  <div className='loadingView flex justifyCenter alignCenter flexCol'>
                    <p>Loading Tweets...</p>
                    <FontAwesomeIcon icon={faSpinner} size="4x" pulse />
                  </div>
                )

              ) : (
                // If data HAS been loaded
                (currentPageId === senPageId) ? (
                  <SentimentPage isFirstLoad={isFirstLoad} term={displayedSearchTerm} jsonData={tweetData}></SentimentPage>
                ) : (
                  (currentPageId === wcPageId) ? (
                    <WordCloudPage isFirstLoad={isFirstLoad} term={displayedSearchTerm} jsonData={tweetData} />
                    ) :
                  (currentPageId === tweetPageId) ? (
                    <TweetPage isFirstLoad={isFirstLoad} term={displayedSearchTerm} jsonData={tweetData} />
                    ) :                     
                    (currentPageId === aboutPageId) ? (
                      <AboutPage />
                    ) : (
                      <></>
                    )
                )
      
              )
        )
      }

    </div>
  );
}

export default App;
