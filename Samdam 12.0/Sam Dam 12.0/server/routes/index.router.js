const express = require('express');
const router = express.Router();

var url = 'mongodb://localhost:27017/samdam09';

const ctrlUser = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper');

let allEmployees = require('../models/employee');
let GetAllAttendance = require('../models/attendance');
let AllSites = require('../models/site');
let AllDates = require('../models/date');

const ctrlEmployee = require ('../controllers/employee.controller');
const ctrlSite = require ('../controllers/site.controller');
const ctrlDate = require ('../controllers/date.controller');
const { result } = require('lodash');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile); 
router.post('/addEmployee',ctrlEmployee.addEmployee);
router.post('/addSite',ctrlSite.addSite);
router.post('/addAttendance',ctrlDate.addDate);

//router.get('/GetAllEmployees',ctrlEmployee.GetAllEmployees);

router.route('/GetAllEmployees').get((req,res)=>{
    allEmployees.find((error,data)=>{
        if (error){
            return next(error)
        }else {
            JSON.stringify(data);
            res.json(data);
            
        }
    })
})

//Delete Empployee
router.route('/delete-employee/:emp_id').delete((req,res,next)=>{
    allEmployees.findOneAndDelete(req.params.emp_id, (error,data)=>{
        if(error){
            return next(error);
            
            
        }else{
            res.status(200).json({
                msg: data
            })
            
        }
    })
})

//Get Single Employee
router.route('/read-employee/:id').get((req,res,next)=>{   
    allEmployees.findById(req.params.id, (error,data)=>{
        if(error){
            return next(error) 
        }else{
            res.json(data)
            
        }
    })
})

//Get all site Employees :-)
router.route('/read-site-employees/:site_id').get((req,res,next)=>{ 
    allEmployees.find( {'site._id':req.params.site_id},(error,data)=>{
       if(error){
           return next(error) 
       }else{
           res.json(data)
           
       }
   })
})


//Update Employee
router.route('/update-employee/:id').put((req,res,next)=>{
    allEmployees.findByIdAndUpdate(req.params.id, {
        $set:req.body
    },(error,data) =>{
        if(error){
            return next(error);
            console.log(error)
        }else{
            res.json(data)
            console.log('Employee successfully Updated..!')
        }
    }
    )
})


//Increase Attendance
router.route('/incAttendance/:id').put((req,res,next)=>{
    GetAllAttendance.findByIdAndUpdate(req.params.id,{
    $set:req.body
},(error,data)=>{
    if(error){
        return next(error) && console.log(error);
    }else {
        res.json(data);
        console.log('Attendance Added Successfully');
    }
})
})

//Get All Attendance

router.route('/GetAllAttendance').get((req,res)=>{
    allEmployees.aggregate([
        {$lookup:{from:'dates',localField:'emp_id',
      foreignField:'emp_id',as:'dates'}},
    ]).exec((err,result)=>{
        if(err){
            console.log("error",err)
        }
        if(result){
            
            JSON.stringify(result);
            res.json(result);
        }
    })  
})

//Get All Date attendance

router.route('/getAllDates').get((req,res)=>{
    AllDates.aggregate([
        {$lookup:{from:'employees',localField:'emp_id',
        foreignField:'emp_id',as:'dates'}},
    ]).exec((err,result)=>{
        if(err){
            console.log("error",err);
        }
        if(result){
            JSON.stringify(result);
            res.json(result);
        }
    })
});

//Get all Site Attendance filterd

router.route('/GetAllSiteAttendance').get((req,res)=>{
    allEmployees.aggregate([
        {$lookup:{from:'attendances',localField:'emp_id',
      foreignField:'emp_id',as:'attendance'}},
    ]).exec((err,result)=>{
        if(err){
            console.log("error",err)
        }
        if(result){
            
            JSON.stringify(result);
            res.json(result);
        }
    })  
})

//Get All Salary Details

router.route('/GetAllSalary').get((req,res)=>{
  allEmployees.aggregate([
      {$lookup:{from:'attendances',localField:'emp_id',
    foreignField:'emp_id',as:'attendance'}},
  ]).exec((err,result)=>{
      if(err){
          console.log("error",err)
      }
      if(result){
          
          JSON.stringify(result);
          res.json(result);
      }
  })  
}   
)

//GEt single salary

router.route('/read-salary/:id').get((req,res,next)=>{   
    GetAllAttendance.findById(req.params.id, (error,data)=>{
        console.log(req.params.id)
        if(error){
            return next(error) 
        }else{
            res.json(data)
            
        }
    })
})


//Get all Sites
router.route('/GetAllSites').get((req,res)=>{
    AllSites.find((error,data)=>{
        if (error){
            return next(error)
        }else {
            JSON.stringify(data);
            res.json(data);
            
        }
    })
})
module.exports = router;



 




















































































































