const Mongoose = require('mongoose')

const previousProjectReportSchema = new Mongoose.Schema({
   reportNumber:{type:String,default:""},
   reportNumber:{type:String,default:""},
   batch:{type:String,default:""},
   date:{type:String,default:""},
   microchip:{type:String,default:""},
   neck:{type:String,default:""},
   bullName:{type:String,default:""},
   organization:{type:String,default:""},
   bapat:{type:String,default:""},
   bct:{type:String,default:""},
   celisa:{type:String,default:""},
   judgement:{type:String,default:""}
},
{timestamps:true})

const PreviousProjectReport = new Mongoose.model("PreviousProjectReport",previousProjectReportSchema);
module.exports = PreviousProjectReport;