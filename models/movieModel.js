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

const movieModel = new mongooseDB.Schema({
    name:String,
    rating: Number,
    genres:[String],
    premiered:  Date,
    image: String,
    summary:String
}, options)

module.exports= mongooseDB.model('movies', movieModel)