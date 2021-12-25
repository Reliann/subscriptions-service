const axios = require('axios').default;


const getAllMovies = async ()=>{
    const resp = await axios.get(`https://api.tvmaze.com/shows`)
    return resp.data
}

const getAllMembers = async ()=>{
    const resp = await axios.get(`https://jsonplaceholder.typicode.com/users`)
    return resp.data
}

module.exports = {
    getAllMovies,
    getAllMembers
}
