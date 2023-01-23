const Mongoose = require('mongoose')

const reportSchema = new Mongoose.Schema({
    reportNumberString:{type:String,default:""},
    reportNumber:{
        initials:{type:String,default:""},
        incrementalValue:{type:Number,default:0}
    },
    workOrder:{
        initials:{type:String,default:""},
        incrementalValue:{type:Number,default:0}
    },
    negative:[]
    ,positive:[]
    ,suspect:[],
    ownerName:{type:String,default:""},
    requesterName:{type:String,default:""},
    contact:{type:Number,default:0},
    email:{type:String,default:""},
    sampleType:{type:String,default:""},
    sampleQuantity:{type:Number,default:0},
    testRequired:{type:String,default:""},
    organization:{type:String,default:""},
    batchArray:[],
    userCreated:{type:Mongoose.Types.ObjectId,ref:"User"},
    mainDate:{type:String,default:""},
    comment:{type:String,default:""}
},{timestamps:true})

const Report = new Mongoose.model("Report",reportSchema);
module.exports = Report;