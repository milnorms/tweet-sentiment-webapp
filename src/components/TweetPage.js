import {React, useEffect, useState} from 'react';
import '../App.css';
import LineChart from './LineChart';

// Importing libs
import 'chartjs-adapter-date-fns';
import { parseISO } from 'date-fns/esm';

import { getColor } from '../Utils';


const TweetPage = (props) => {
    // Loading in lets from props
    const {isFirstLoad, term, jsonData } = props;

    const [hasData, setHasData] = useState(false);

  useEffect(() => {
    if (!isFirstLoad) {
      setHasData(true)
    }
  }, [isFirstLoad]);

  // Utility functions

  // Breaks str down into an arr of substrings split every n spaces
  function breakStr(str, spaces) {
    let newStr = "";
    let spaceCount = 0;


    for (let i = 0; i < str.length; i++) {
        if (str[i] === " ") {
            spaceCount++;
        }
        if (spaceCount === spaces) {
            newStr += "\n";
            spaceCount = 0;
        } else {
            newStr += str[i];
        }
    }

  return newStr.split('\n')
}



    // Setting constants
    const fontFamily = 'Nunito'
    // Spaces before linebreaks in tooltip body
    const spacesBeforeBreak = 20

    // Constants
    // Chartjs config options. Ref: https://www.chartjs.org/docs/latest/configuration/title.html
    const options = {
      showLine: false,
      pointRadius: 5,
        plugins: {
          tooltip: {
            bodyFont: {
              size: 15
            },
            titleFont: {
              size: 16
            },
            boxWidth: 10,
            boxHeight: 20,
            padding: 15,
            displayColors: false,
            callbacks: {
              title: (item) => {
                let pol = item[0]['parsed']['y']
                return `Polarity: ${pol}`
              },
              beforeLabel: (item) => {
                const { dataIndex } = item
                let text = parseISO(jsonData['sentiment'][dataIndex]['timestamp'])
                return `${text}\n`

              },
              label: (item) => {
                const { dataIndex } = item
                let text = jsonData['sentiment'][dataIndex]['tweet']
                // Add linebreaks to str
                return breakStr(text, spacesBeforeBreak)

              }
                
            }
          },
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
                text: `Most recent tweets of: ${term}`,
                padding: {
                    top: 0,
                    bottom: 20
                },
            },

        },
        scales: {
            x: {
              type: 'time',
              time: {
                unit: 'minute'
            },
                ticks: {
                  // callback: (value, index, ticks) => {
                  //   return value
                  // },
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
            },
          title: {
              display: true,
              text: 'Polarity',
              font: {
                family: fontFamily,
                size: 14
                }
            },

            }
        }
    }

    

    // Set data to empty arr if json data hasnt been loaded
    const data = hasData ? (jsonData['sentiment'].map(tweet => {
      return {
        x: parseISO(tweet['timestamp']), 
        y: tweet['polarity']
      }
    })) : ([])

    const chartData = {
        datasets: [{
          label: 'Tweets',
          data: data,
          // backgroundColor: '#0f4869'
          backgroundColor: (ctx) => {
            // console.log(ctx, ctx['index'])
            const pol = jsonData['sentiment'][ctx['index']]['polarity']
            return getColor(pol*30)
          }
        }],
      };

  return (
    <div className='mainContent flexCol alignCenter justifyCenter'>
        <div className="mainChartWider padding card">
        <LineChart chartData={chartData} options={options}/>
        </div>
        {/* <div className='chartCardFiller card sideContent sentimentStatsContainer'></div> */}

    </div>
  )
}

export default TweetPage