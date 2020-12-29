//This file will handle connection logic to mongo db
const mongoose = require('mongoose');

mongoose.Promise = global.Promise ;
mongoose.connect('mongodb://localhost:27017/TaskManager' , {useNewUrlParser : true}).then(() => {
    console.log("connected to mongodb successfully :)");
}).catch((e) => {
    console.log("Error while trying to connect to MongoDB");
    console.log(e);
}); 

//To prevent duplication warnings
mongoose.set('useCreateIndex' , true);
mongoose.set('useFindAndModify' , false);

module.exports = {
    mongoose
}