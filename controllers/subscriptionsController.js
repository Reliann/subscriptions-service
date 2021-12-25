const router = require('express').Router()
const subscriptionsBl = require('../BLs/subscriptionsBl')


router.route('/movies').get(async (req,res)=>{
    const resp = await subscriptionsBl.getFullMovies()
    return res.json(resp)
})

router.route('/:id').get(async (req,res)=>{
    const resp = await subscriptionsBl.getSubByMember(req.params.id)
    return res.json(resp)
})

router.route('/:id/:movieId').post(async(req,res)=>{
    // subscribe to new movie
    const resp = await subscriptionsBl.addNewSubscription(req.params.id, req.params.movieId, req.body)
    return res.json(resp)
})

router.route('/:id/:movieId').delete(async (req,res)=>{
    //remove subscription
    const resp = await subscriptionsBl.removeSubscription(req.params.id,req.params.movieId)
    return res.json(resp)
})


module.exports = router