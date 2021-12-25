const mongoose = require('mongoose')

//ODM 

/*mongoose.connect("mongodb://localhost:27017/subscriptionsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})*/
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/usersDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})