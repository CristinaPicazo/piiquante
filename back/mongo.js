const mongoose = require('mongoose');
const uri = "mongodb+srv://Cristina:<password>@cluster0.rxnku.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri).then((() => {
    console.log("Connected to database!");
})).catch(err => {
    console.log("Connection failed!", err);
});
