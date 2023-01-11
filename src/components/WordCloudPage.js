import React from 'react';
import '../App.css';

// Importing tag cloud package for word cloud viz. Ref: https://madox2.github.io/react-tagcloud/
import { TagCloud } from 'react-tagcloud'

const WordCloudPage = (props) => {

// Loading in vars from props
const {isFirstLoad, term, jsonData } = props;

// Setting default variables with empty data
let wordCountData  = []

// CONSTANTS

// This function calculates the hue of the colors based on count
const getColor  = (count) => {
    // Color styling constants (HSL). Going for a blue -> violet theme
    // Starting hue (count of 0 will yield this hue. every higher count changes color)
    const BASE_HUE = 175;
    const BASE_LIGHT = 40;
    // Higher means more dramatic change
    const COLOR_MULT = 5
    // Maximum hue the colors will reach
    const COLOR_MAX = 360

    const calcHue = BASE_HUE + (count * COLOR_MULT)
    const color = `hsl(${calcHue > COLOR_MAX ? COLOR_MAX : calcHue}, 100%, ${BASE_LIGHT}%)`
    // console.log(`BASE HUE: ${BASE_HUE}, calc hue: ${calcHue}`)
    return (color)
}
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
        <div className="wordCountContainer marginTop ">
            <h1>{wordCountData.length} Most Common Words</h1>
        </div>
        <div className="tagCloudContainer marginTop card">
            <TagCloud
                minSize={20}
                maxSize={70}
                tags={wordCountData}
                className="simple-cloud"
            />
        </div>

    </div>
  )
}

export default WordCloudPage