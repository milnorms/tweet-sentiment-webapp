import React, { useRef, useState, useEffect } from 'react'

// Importing fa icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCsv } from '@fortawesome/free-solid-svg-icons'

const Csv = (props) => {

    // Loading in vars from props
    const { isFirstLoad, isLoading, searchInput, jsonData } = props;

    // Constants
    const linkRef = useRef(null);

    // States
    // Loading states
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    // Hooks
    
    // Checking if data is loaded
    useEffect(() => {
      if (isFirstLoad || isLoading) {
        // console.log('data CANT be downloaded')
        setIsDataLoaded(false)
      } else {
        // console.log('data can be downloaded');
        setIsDataLoaded(true)}
    }, [isLoading, isFirstLoad]);

    // Sanitize contents of cell to a str and remove special chars
  const sanitizeStr = (cell) => {
    // Cast to string
      let cellStr = `${cell}`
      // We remove blanks and check if the column contains
      // other whitespace,`,` or `"`.
      // In that case, we need to quote the column.
      if (cellStr.replace(/ /g, '').match(/[\s,"]/)) {
          return '"' + cellStr.replace(/"/g, '""') + '"';
      }
      return cellStr;
  }

    // Turn an arr containing objs into a csv string
    const createCsvString = (dataArr) => {
      // Create string of object keys
      const header = Object.keys(dataArr[0]).join(',').concat('\n')
    
      // Create string of object values
      const values = dataArr.map(row => {
        return Object.values(row).map(cell => sanitizeStr(cell)).join(',')
      }).join('\n')
    
      // Concat header and values
      const table = header.concat(values)

      return table
    }

    const generateCSV = (data, fileName) => {  
      
        // Destructure object to arrays
        const { sentiment, wordcount} = data
  
        // Create a CSV string
        const csvString = createCsvString(sentiment)
  
        // Set the link's href and download attributes
        linkRef.current.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csvString)}`;
        linkRef.current.download = `${fileName}_tweet_sentiment.csv`;
  
        //Click the link to trigger the download
        linkRef.current.click();
    }

  return (
    <div>
        <FontAwesomeIcon onClick={() => generateCSV(jsonData, searchInput)} className={`csvIcon ${isDataLoaded ? '' : "displayNone"}`} icon={faFileCsv} size="2x"/>
        <a ref={linkRef} style={{ display: "none" }}></a>
    </div>
  )
}

export default Csv
