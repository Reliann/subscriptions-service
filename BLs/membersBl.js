const membersModel = require('../models/memberModel')
const axiosUtil = require('./axiosUtils')


const pullData  = async ()=>{
    /* async, part of db initiation..*/
    const membersNum = await membersModel.count({})
    console.log(!membersNum? "Filling Members Collection":"Members Collection Ready");
    if (membersNum==0){
        const members = await axiosUtil.getAllMembers()
        for (let i = 0 ; i<members.length; i++){
            addMember({
               name:members[i].name,
               email:members[i].email,
               city:members[i].address.city
            })
        }
    }
    !membersNum&&console.log("Members Done!");
}
const addMember = (member) =>{
    let new_member = new membersModel({
        name: member.name,
        email: member.email,
        city: member.city
    })

    return new Promise((resolve,reject)=>{
        new_member.save((err,data)=>{
            err? reject(err):resolve(data)
        })
    })
}

const getAllMembers = () =>{
    return new Promise((resolve,reject)=>{
        membersModel.find({},(err,members)=>{
            err? reject(err): resolve(members)
        })
    })
    
}

const getMember = async(id) =>{
    const member = await membersModel.findOne({_id:id})
    return member
}

const updateMember = async(id,data) =>{
    const member = await membersModel.findOneAndUpdate({_id:id},{
        name:data.name || "",
        email:data.email || "",
        city:data.city || ""
    },{new:true})
    return member
}
const deleteMember = async(id) =>{
    const resp = await membersModel.findOneAndDelete({_id:id})
    return resp
}


module.exports = {
    pullData,
    getAllMembers,
    addMember,
    getMember,
    updateMember,
    deleteMember
}