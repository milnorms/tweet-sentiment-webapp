// Constants.js
const prod = {
    url: {
     API_URL: 'https://tweet-sentiment-analysis-api-1h12-main-magw6pcwcq-wm.a.run.app'
    }
   }
   
   const dev = {
    url: {
     API_URL: 'http://0.0.0.0:8000'
    }
   }
   
   export const config = process.env.NODE_ENV === "development" ? dev : prod