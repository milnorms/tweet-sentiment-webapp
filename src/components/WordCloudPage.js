import React from 'react';
import '../App.css';

// Importing tag cloud package for word cloud viz. Ref: https://madox2.github.io/react-tagcloud/
import { TagCloud } from 'react-tagcloud'

import { getColor } from '../Utils';

const WordCloudPage = (props) => {

// Loading in vars from props
const {isFirstLoad, jsonData } = props;

// Setting default variables with empty data
let wordCountData  = []

// CONSTANTS

// Helper functions
const getWordCountData = () => {
    // Creating new array with the correct keys for wordcloud component
    return jsonData.wordcount.map((data) => {
        return {
            value: `${data.word}`,
            // value: data.word,
            count: data.count,
                // props below will be passed to tag component
            props: {
                title: data.count,
                style: {
                    color: getColor(data.count),
                    padding: '5px'
                  }
            }
    }})

}

const initDataLoad = () => {
    // Updating word count data after data is loaded
    wordCountData = getWordCountData()
}

// Main Execution for loaded data
if (!isFirstLoad) {
   initDataLoad()
}

  return (
    <div className='mainContent alignCenter flexCol'>
        <div className="marginTop ">
            <h1>{wordCountData.length} Most Common Words</h1>
        </div>
        <div className="tagCloudContainer marginTop card">
            {
                (isFirstLoad) ? (
                    <h2>No tweets loaded</h2>
                ) : (
                    <TagCloud
                    minSize={20}
                    maxSize={50}
                    tags={wordCountData}
                    className="simple-cloud"
                    />
                )
            }

        </div>

    </div>
  )
}

export default WordCloudPage