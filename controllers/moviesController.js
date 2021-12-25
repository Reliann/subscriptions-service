const router = require('express').Router()
const moviesBL = require('../BLs/moviesBl')
const subscriptionsBl = require('../Bls/subscriptionsBl')

// cheak if I need to pull data to db
moviesBL.pullData()

router.route('/').get(async (req,res)=>{
    const movies = await moviesBL.getAllMovies()
    return res.json(movies)
})

router.route('/').post(async(req, res)=>{
    const movie = await moviesBL.addMovie(req.body)
    return res.json(movie)
})
router.route('/:id').delete(async(req, res)=>{
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        return res.status(400).json({status: 400, message: "invalid ID"})
    }
    else{
        const resp = await moviesBL.deleteMovie(req.params.id)
        if (resp){
            subscriptionsBl.removeMovieFromAllSub(req.params.id)
            res.json({})
        }else{
            return res.status(404).json({status: 404, message: "No such ID"})
        }
    }
})
router.route('/:id').put(async(req, res)=>{
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        return res.status(400).json({status: 400, message: "invalid ID"})
    }
    else{
        const resp = await moviesBL.updateMovie(req.params.id,req.body)
        if (resp){
            res.json(resp)
        }else{
            return res.status(404).json({status: 404, message: "No such ID"})
        }
    }
})
router.route('/:id').get(async(req, res)=>{
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        return res.status(400).json({status: 400, message: "invalid ID"})
    }
    else{
        const resp = await moviesBL.getMovie(req.params.id)
        if (resp){
            subscriptionsBl.removeMovieFromAllSub(req.params.id)
            res.json(resp)
        }else{
            return res.status(404).json({status: 404, message: "No such ID"})
        }
    }
})
module.exports = router