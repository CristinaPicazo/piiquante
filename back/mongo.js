const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const password = process.env.DB_PASSWORD;
const username = process.env.DB_USER;
const dbName = process.env.DB_NAME;
const uri = `mongodb+srv://${username}:${password}@cluster0.rxnku.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri).then((() => {
    console.log("Connected to database!");
})).catch(err => {
    console.log("Connection failed!", err);
});

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

const userModel = mongoose.model('User', userSchema);

module.exports = { mongoose, userModel }