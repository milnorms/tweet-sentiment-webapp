import React from 'react'

const Navbar = ({ currentPageId, senPageId, wcPageId, tweetPageId, aboutPageId, handlePageClick }) => {
  return (
    <div className="navBarContainer">
    <div className="navBar">
      <div className={`pageBtn ${(currentPageId === senPageId) ? 'pageBtnActive' : ''}`} id={senPageId} onClick={handlePageClick}>Sentiment</div>
      <div className={`pageBtn ${(currentPageId === wcPageId) ? 'pageBtnActive' : ''}`} id={wcPageId} onClick={handlePageClick}>Tag Cloud</div>
      <div className={`pageBtn ${(currentPageId === tweetPageId) ? 'pageBtnActive' : ''}`} id={tweetPageId} onClick={handlePageClick}>Tweets</div>
      <div className={`pageBtn ${(currentPageId === aboutPageId) ? 'pageBtnActive' : ''}`} id={aboutPageId} onClick={handlePageClick}>About</div>
    </div>
  </div>
  )
}

export default Navbar