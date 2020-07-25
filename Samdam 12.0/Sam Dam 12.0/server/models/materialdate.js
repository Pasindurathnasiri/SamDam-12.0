const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MaterialDateSchema = new mongoose.Schema({
    Date:{type:String},
    T_10:{type:Number},
    T_32:{type:Number},
    sand:{type:Number},
    cement:{type:Number},
    ABC:{type:Number},
    binding:{type:Number},
    metal_1:{type:Number},
    metal_1h:{type:Number},
    metal_3q:{type:Number},
    T_16:{type:Number},
    HBlock_4:{type:Number},
    HBlock_6:{type:Number}

})

var getAllMaterialDatesSchema = new mongoose.Schema({
    Date:{type:String},
    T_10:{type:Number},
    T_32:{type:Number},
    sand:{type:Number},
    cement:{type:Number},
    ABC:{type:Number},
    binding:{type:Number},
    metal_1:{type:Number},
    metal_1h:{type:Number},
    metal_3q:{type:Number},
    T_16:{type:Number},
    HBlock_4:{type:Number},
    HBlock_6:{type:Number}

})

mongoose.model('materialdates',MaterialDateSchema)
module.exports = mongoose.model('Materialdates',getAllMaterialDatesSchema);
