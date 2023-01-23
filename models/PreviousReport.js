const Mongoose = require('mongoose')

const previousReportSchema = new Mongoose.Schema({
   reportNumber:{type:String,default:""},
   reportNumber:{type:String,default:""},
   batch:{type:String,default:""},
   date:{type:String,default:""},
   microchip:{type:String,default:""},
   neck:{type:String,default:""},
   bullName:{type:String,default:""},
   bapat:{type:String,default:""},
   bct:{type:String,default:""},
   celisa:{type:String,default:""},
   judgement:{type:String,default:""}
},{timestamps:true})

const PreviousReport = new Mongoose.model("PreviousReport",previousReportSchema);
module.exports = PreviousReport;