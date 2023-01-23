const User = require("../models/User")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const Report = require("../models/Report");
const ReportProject = require("../models/ReportProject.js")

class ReportClassProject{
 async getAllReports(req,res){
    console.log(req.userDetails)
    ReportProject.find({}).sort({createdAt:-1})
    .then(response=>{
      res.status(200).send({msg:"success",result:response})
    })
 }

 async createReport(req,res){
   const report = new ReportProject({
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
   ReportProject.updateOne({_id:req.body.reportId},{...req.body.reportObject})
   .then(response=>{
      res.send({msg:"success",result:response})
   })
 }

 async deleteReport(req,res){
    ReportProject.deleteOne({_id:req.body.reportId})
   .then(response=>{
      res.send({msg:"success",result:response})
   })
 }

 async getSingleReportId(req,res){
    ReportProject.find({}).sort({_id:-1}).limit(1)
   .then(response=>{
      if(response.length>0){
         res.send({msg:"success",result:response[0]})
      }else{
         res.send(null)
      }
      
   })
 }

 async searchReport(req,res){
    ReportProject.findOne({
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

const reportProjectController = new ReportClassProject();
module.exports=reportProjectController;