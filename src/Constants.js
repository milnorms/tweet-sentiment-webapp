// Constants.js
const prod = {
    // Replace this later!!
    url: {
     API_URL: 'https://milnorms.rocks:8443'
    }
   }
   
   const dev = {
    url: {
     API_URL: 'http://0.0.0.0:8000'
    }
   }
   
   export const config = process.env.NODE_ENV === "development" ? dev : prod