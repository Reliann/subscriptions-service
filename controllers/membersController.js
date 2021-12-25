const router = require('express').Router()
const membersBl = require('../BLs/membersBl')
const subsBl = require('../Bls/subscriptionsBl') 

membersBl.pullData()

router.route('/').get(async (req,res)=>{
    const members = await membersBl.getAllMembers()
    return res.json(members)
})

router.route('/:id').get(async(req,res)=>{
    // get a member
    const resp = await membersBl.getMember(req.params.id)
    return res.json(resp)
})

router.route('/').post(async(req,res)=>{
    // add new member
    const resp = await membersBl.addMember(req.body)
    return res.json(resp)
})

router.route('/:id').put(async(req,res)=>{
    // update member
    const resp = await membersBl.updateMember(req.params.id,req.body)
    return res.json(resp)
})

router.route('/:id').delete(async(req,res)=>{
    // delete member
    const resp = await membersBl.deleteMember(req.params.id)
    if (resp){
        subsBl.removeMemberSubs(req.params.id)
    }
    return res.json(resp)
})


module.exports = router