import React from 'react';
import '../App.css';

// Importing bar chart for visualization
import BarChart from './BarChart';

// Library Imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile, faFaceMeh, faFaceAngry } from '@fortawesome/free-solid-svg-icons'

const SentimentPage = (props) => {

    // Loading in vars from props
    const { isFirstLoad, term, jsonData } = props;
    
    // Setting constants
    const fontFamily = 'Nunito'

    // Constants
    // Chartjs config options. Ref: https://www.chartjs.org/docs/latest/configuration/title.html
    const options = {
        plugins: {
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        family: fontFamily
                    }
                }
            },
            title: {
                display: true,
                font: {
                    family: fontFamily,
                    size: 22
                },
                text: `Sentiment Value of: ${term}`,
                padding: {
                    top: 0,
                    bottom: 20
                },
            },

        },
        scales: {
            x: {
                ticks: {
                  font: {
                    family: fontFamily,
                    size: 14
                  }
                }
              },
            y: {
            ticks: {
                font: {
                family: fontFamily,
                size: 14
                }
            }
            }
        }
    }

    // Setting default variables with empty data

    let displayedSearchTerm = term ? term : ''

    let sentimentStats = {
        percentPos: 0,
        percentNeg: 0,
        percentNeu: 0
      };

    let topSentiment = 0;

    let mainChartData = {
        labels: ['Positive', 'Negative', 'Neutral'],
        datasets: [{
            label: 'Tweet Count',
            data: [0, 0, 0],
            backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            ],
            borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgb(255, 99, 132)',
            'rgb(255, 205, 86)'
            ]
        }]
        }; 

    // Functions

    // Updates sentiment variables with loaded data
    const handleSentimentStats = (posCount, negCount, neuCount, totalCount) => {
    
        const senStats = {
          percentPos: Math.round((posCount/totalCount) * 100),
          percentNeg: Math.round((negCount/totalCount) * 100),
          percentNeu: Math.round((neuCount/totalCount) * 100)
        }
    
        // Top sentiment percentage
        const max = Math.max(...Object.values(senStats));

        sentimentStats = senStats;
        topSentiment = max;
        
      }

      // Populate empty charts and elements with data
      const initDataLoad = () => {
        // Counts for data aggregation
        const posCount = jsonData.sentiment.map(data => data.pos).reduce((total, next) => total + next);
        const negCount = jsonData.sentiment.map(data => data.neg).reduce((total, next) => total + next);
        const neuCount = jsonData.sentiment.map(data => data.neu).reduce((total, next) => total + next);
        const totalCount = jsonData.sentiment.length;

        // Setting main chart data 
        mainChartData = {
            labels: ['Positive', 'Negative', 'Neutral'],
            datasets: [{
                label: 'Tweet Count',
                data: [posCount, negCount, neuCount],
                backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                ],
                borderColor: [
                'rgb(75, 192, 192)',
                'rgb(255, 99, 132)',
                'rgb(255, 205, 86)'
                ]
            }]
            };

        handleSentimentStats(posCount, negCount, neuCount, totalCount);
      }

     // Main Execution for loaded data
      if (!isFirstLoad) {
        initDataLoad()
      }


  return (

    <div className="mainContent flexCol alignCenter justifyCenter">
                    
        <div className="mainChart padding card">
            {/* <div className="displayedSearchTerm">
                <p>{displayedSearchTerm}</p>
            </div> */}
            <BarChart chartData={mainChartData} options={options}/>
        </div>

        <div className="sideContent paddingHor card sentimentStatsContainer">

            <div className="sentimentStats">
                <p className='sentimentPos' >
                    {sentimentStats.percentPos}%
                    <FontAwesomeIcon className={`sentimentIcon ${(sentimentStats.percentPos === topSentiment) ? '' : ''}`} icon={faFaceSmile}/>
                </p>
                <p className='sentimentNeg'>
                    {sentimentStats.percentNeg}%
                     <FontAwesomeIcon className={`sentimentIcon ${(sentimentStats.percentNeg === topSentiment) ? '' : ''}`} icon={faFaceAngry}/>
                </p>
                <p className='sentimentNeu'>
                    {sentimentStats.percentNeu}%
                    <FontAwesomeIcon className={`sentimentIcon ${(sentimentStats.percentNeu === topSentiment) ? '' : ''}`} icon={faFaceMeh}/>
                </p>
            </div>

        </div>

    </div>
    
  )
}

export default SentimentPage