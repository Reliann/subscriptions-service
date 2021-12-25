const mongooseDB = require('mongoose')

// to remove the annoying __v
function omit_v(doc, obj) {
    delete obj.__v;
    return obj;
}

var options = {
    toJSON: {
        transform: omit_v
    }
}

const memberModel = new mongooseDB.Schema({
    name:String,
    email:String,
    city:String
}, options)

module.exports= mongooseDB.model('members', memberModel)