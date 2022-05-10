// Controllers User
const { getSauces } = require("./getSauces");
const { getSauceById } = require("./getSauceById");
const { createSauce } = require("./createSauce");
const { deleteSauce } = require("./deleteSauce");
const { updateSauce } = require("./updateSauce");

module.exports = {getSauces, getSauceById, createSauce, deleteSauce, updateSauce};
