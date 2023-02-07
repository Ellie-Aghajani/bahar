const { Logger } = require("sass");

function log(req, res, next){
    console.log('logging...');
    next();
}


module.exports = Logger;