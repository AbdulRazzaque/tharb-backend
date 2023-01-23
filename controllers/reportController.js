const User = require("../models/User")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const Report = require("../models/Report");
const PreviousReport = require("../models/PreviousReport")
const PreviousProjectReport = require("../models/PreviousProjectReport")
// const array = require('./json')
//const array2 = require('./json2')

class ReportClass{
 async getAllReports(req,res){
    console.log(req.userDetails)
    Report.find({}).sort({createdAt:-1})
    .then(response=>{
      res.status(200).send({msg:"success",result:response})
    })
 }

 async storeOldReport(req,res){
   //PreviousReport.insertMany(array2)
   // .then(response=>{
   //    res.send(response)
   // })
 }

 async getOldReports(req,res){
   PreviousReport.find({})
   .then(response=>{
      res.send(response)
   })
 }

 async getOldProjectReports(req,res){
   PreviousProjectReport.find({})
   .then(response=>{
      res.send(response)
   })
 }

 async createReport(req,res){
   const report = new Report({
   reportNumber:{
         initials:req.body.reportNumberInitials,
         incrementalValue:req.body.reportNumberIncrementalValue
     },
     workOrder:{
         initials:req.body.workOrderInitials,
         incrementalValue:req.body.workOrderIncrementalValue
     },
     negative:req.body.negative
     ,positive:req.body.positive
     ,suspect:req.body.suspect,
     ownerName:req.body.ownerName,
     requesterName:req.body.requesterName,
     contact:req.body.contact,
     email:req.body.email,
     sampleType:req.body.sampleType,
     sampleQuantity:req.body.sampleQuantity,
     testRequired:req.body.testRequired,
     organization:req.body.organization,
     batchArray:req.body.batchArray,
     userCreated:req.userDetails,
     comment:req.body.comment,
     mainDate:req.body.mainDate,
     reportNumberString:`${req.body.reportNumberInitials}-${req.body.reportNumberIncrementalValue}`
   })
   report.save()
   .then(response=>{
      res.status(200).send({msg:"success",result:response})
   })
 }

 async saveReport(req,res){
   console.log(req.body)
//    workOrder:{
//       initials:req.body.workOrderInitials,
//       incrementalValue:req.body.workOrderIncrementalValue
//   },
   let workOrder={
      initials:req.body.reportObject.workOrderInitials,
      incrementalValue:req.body.reportObject.workOrderIncrementalValue
   }
   req.body.reportObject.workOrder=workOrder;
   Report.updateOne({_id:req.body.reportId},{...req.body.reportObject})
   .then(response=>{
      res.send({msg:"success",result:response})
   })
 }

 async deleteReport(req,res){
   Report.deleteOne({_id:req.body.reportId})
   .then(response=>{
      res.send({msg:"success",result:response})
   })
 }

 async getSingleReportId(req,res){
   Report.find({}).sort({_id:-1}).limit(1)
   .then(response=>{
      if(response.length>0){
         res.send({msg:"success",result:response[0]})
      }else{
         res.send(null)
      }
      
   })
 }

 async searchReport(req,res){
   Report.findOne({
      reportNumberString:req.body.reportNumberString
      })
      .then(response=>{
         if(response){
            res.send({msg:"success",result:response})
         }else{
            res.status(400).send("Not Found")
         }
      })
 }
 

}

const reportController = new ReportClass();
module.exports=reportController;