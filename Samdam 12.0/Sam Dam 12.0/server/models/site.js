const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var siteSchema = new mongoose.Schema({
    site_id: {type:String},
    site_name: {type:String},
    place:{type:String},
    start_date:{type:Date},
    end_date:{type:Date},
    // type_of_site:{type:String},
    // est_budget:{type:String},
    // no_of_sk:{type:String},
    // no_of_usk:{type:String}

});

var getAllSiteSchema = new mongoose.Schema({
    site_id: {type:String},
    site_name: {type:String},
    place:{type:String},
    start_date:{type:Date},
    end_date:{type:Date},
    // type_of_site:{type:String},
    // est_budget:{type:String},
    // no_of_sk:{type:String},
    // no_of_usk:{type:String}
})

mongoose.model('site',siteSchema)
module.exports = mongoose.model('Sites',getAllSiteSchema);