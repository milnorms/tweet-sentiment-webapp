// Constants.js
const prod = {
    url: {
     API_URL: 'http://142.93.11.57:8000'
    }
   }
   
   const dev = {
    url: {
     API_URL: 'http://0.0.0.0:8000'
    }
   }
   
   export const config = process.env.NODE_ENV === "development" ? dev : prod