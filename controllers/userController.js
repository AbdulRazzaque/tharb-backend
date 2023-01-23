const User = require("../models/User")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
class UserClass{
    async getUser (req,res){
        res.send("home routre user")
    }

    async createUser(req,res){
        const {email,password} = req.body;
        if(!email || !password){
            res.status(400).send("Data Missing")
        }else{
            User.findOne({email:req.body.email})
            .then(async singleUser=>{
                if(!singleUser){
                    let hashPassword = await bcrypt.hash(req.body.password, 10);
                    const user = new User({
                        email,
                        password:hashPassword
                    })
                    user.save()
                    .then(response=>{
                        var token = jwt.sign({ email: req.body.email,_id:response._id },process.env.TOKEN);
                        res.status(201).send({msg:"success",result:token})
                    })
                }else{
                    res.status(400).send({msg:"success",result:"User alerady exist"})    
                }
                
            })

        }
    }

    async logIn(req,res){
        const {email,password}=req.body;
        if(!email || !password){
            res.status(400).send("Data Missing")
        }else{
            User.findOne({email})
            .then(async response=>{
                console.log(response)
                if(response){
                    const hashPassword = await bcrypt.compare(password,response.password)
                    if(hashPassword){
                        var token = jwt.sign({ email: req.body.email,_id:response._id },process.env.TOKEN);
                        res.status(200).send({msg:"success",result:token})
                    }else{
                        res.status(400).send({msg:"success",result:"Incorrect Password"})    
                    }
                }else{
                    res.status(400).send({msg:"success",result:"User not found"})
                }
            })
        }
    }


}

const userController = new UserClass();
module.exports=userController;