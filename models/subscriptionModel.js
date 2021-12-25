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

const subscriptionsModel = new mongooseDB.Schema({
    memberId:String,
    movies:[{
        movieId:String,
        watchDate:Date
    }]
}, options)

module.exports= mongooseDB.model('subscriptions', subscriptionsModel)