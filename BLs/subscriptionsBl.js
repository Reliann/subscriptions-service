const subscriptionsModel  = require('../models/subscriptionModel') 
const moviesBl = require("./moviesBl")
const membersBl =require('./membersBl')

// this module is the coonection between members and movies

const getFullMovies = async()=>{
// this takes all the movies and all the subs and merge them
// use subscriptionsModel.find({"movies.movieId":id}) filter 
// for each movie, and go over the reasults to append a member
    const subs = await subscriptionsModel.find({})
    let movies = await moviesBl.getAllMovies()
    if (subs.length){
        movies = movies.map(async(movie)=>{
            let watchedIt = subs.filter((sub)=>(sub.movies.find(mov=>(mov.movieId==movie._id))))
            watchedIt= watchedIt.map(async (sub)=>{
                const mem = await membersBl.getMember(sub.memberId)
                // ToDo: make this better (its too complex!)
                const date =  sub.movies.find(mov=>(mov.movieId==movie._id)).watchDate
                return {member:mem, watchDate:date }})
            watchedIt = await Promise.all(watchedIt)
            return {movie:movie,subs:watchedIt}
        })
        return Promise.all(movies)
    }else{
        movies = movies.map((movie)=>{
            return {movie:movie,subs:[]}
        })
        return movies
    }
}

const removeMovieFromAllSub =async (id)=>{
    //review this once i can addd subs
    const resp = await subscriptionsModel.updateMany({"movies.movieId":id},{$pull:{
        movies:{movieId:id}
    }})
    return resp
}

const addNewSubscription = async (id, movieId, data)=>{

    let resp = await subscriptionsModel.findOneAndUpdate({memberId:id, "movies.movieId":{'$ne':movieId}},
    {$push:{
        "movies":{movieId:movieId,
        watchDate:data.watchDate}
    }},{new:true})
    // if no member found create one
    const doesSubExist = await subscriptionsModel.findOne({memberId:id})
    if (!doesSubExist){
        const newSub = new subscriptionsModel({
            memberId:id,
            movies : [{movieId:movieId, watchDate:data.watchDate}]
        })
        resp = await newSub.save()
    }
    return resp
}
const removeSubscription = async (id,movieId)=>{
    return "removed sub"
}

const getSubByMember = async (id)=>{
    let resp = await subscriptionsModel.findOne({memberId:id})
    if (resp && resp.movies.length!==0){
        resp = resp.movies.map(async (movie)=>{
            let mov = await moviesBl.getMovie(movie.movieId)
            mov = mov.name
            return {...movie.toObject(),name:mov}
        })
        resp = await Promise.all(resp)
        return resp
    }else{
        return []
    }
}

const removeMemberSubs = async (id)=>{
    const resp = subscriptionsModel.findOneAndDelete({memberId:id})
    return resp
}
module.exports = {getFullMovies, removeMemberSubs,removeMovieFromAllSub, addNewSubscription, removeSubscription,getSubByMember}