const mongoose = require('mongoose');
const MaterialDates = mongoose.model('materialdates');

module.exports.addMaterialDates = (req,res,next)=>{
    var mat_dates = new MaterialDates();
    mat_dates.Date = req.body.dor;
    mat_dates.T_10 = req.body.T_10;
    mat_dates.T_32 = req.body.T_32;
    mat_dates.sand = req.body.sand;
    mat_dates.cement = req.body.cement;
    mat_dates.ABC = req.body.ABC;
    mat_dates.binding= req.body.binding;
    mat_dates.metal_1 = req.body.metal_1;
    mat_dates.metal_1h = req.body.metal_1h;
    mat_dates.metal_3q = req.body.metal_3q;
    mat_dates.T_16 = req.body.T_16;
    mat_dates.HBlock_4 = req.body.HBlock_4;
    mat_dates.HBlock_6 = req.body.HBlock_6;
    console.log(mat_dates);
    mat_dates.save((err,doc)=>{
        if(!err)
        console.log(mat_dates) && res.send(doc);
        else
        return next(err);
    })
    

}