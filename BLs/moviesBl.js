const movieModel = require('../models/movieModel')
const axiosUtil = require('./axiosUtils')

const pullData  = async ()=>{
    /* async, part of db initiation..*/
    const moviesNum = await movieModel.count({})
    console.log(!moviesNum? "Filling Movies Collection":"Movies Collection is Ready");
    if (moviesNum==0){
        let allMovies = await axiosUtil.getAllMovies()
        const movies = allMovies.slice(0,15)
        for (let i = 0 ; i<movies.length; i++){
            addMovie({
                name: movies[i].name,
                rating: movies[i].rating.average,
                genres:movies[i].genres,
                premiered:  movies[i].premiered,
                image: movies[i].image.medium,
                summary: movies[i].summary
            })
        }
    }
    !moviesNum&&console.log("Done!");
}
const addMovie = (movie) =>{
    let new_movie = new movieModel({
        name:movie.name,
        rating: movie.rating || 0,
        genres:movie.genres ,
        premiered:  movie.premiered,
        image: movie.image,
        summary:movie.summary
    })

    return new Promise((resolve,reject)=>{
        new_movie.save((err,data)=>{
            err? reject(err):resolve(data)
        })
    })
}

const getAllMovies = () =>{
    return new Promise((resolve,reject)=>{
        movieModel.find({},(err,movies)=>{
            err? reject(err): resolve(movies)
        })
    })
    
}

const deleteMovie = async (id)=>{
    // Delete from subs too!
    const resp = await movieModel.findOneAndDelete({_id:id})
    return resp
}

const updateMovie = async(id, movie)=>{
    const resp = await movieModel.findOneAndUpdate({_id:id},{
        name:movie.name,
        rating: movie.rating || 0,
        genres: movie.genres ,
        //premiered: movie.premiered, - cant really change it...
        image: movie.image,
        summary:movie.summary
    },{new:true})
    return resp
}
const getMovie = async (id)=>{
    // Delete from subs too!
    const resp = await movieModel.findOne({_id:id})
    return resp
}

module.exports = {
    pullData,
    getAllMovies,
    addMovie,
    deleteMovie,
    updateMovie,
    getMovie
}