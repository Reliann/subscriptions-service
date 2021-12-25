const mongoose = require('mongoose')

//ODM 

/*mongoose.connect("mongodb://localhost:27017/subscriptionsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})*/
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/usersDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})