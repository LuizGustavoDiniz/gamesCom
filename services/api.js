const axios = require('axios')

const api = axios.create({
    baseURL: 'https://www.freetogame.com/api/' 
})

module.exports = api