const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const reportProjectRouter = require("./router/reportProjectRouter")
const Stripe = require("stripe");
const stripe = Stripe('sk_test_51M15AISFngpqwE9LuoXeT78gJEfniRK99EvS909VDvCj14DYmxeSTn4XdH0Jmg6Tti4xe5VTfDKSLbgtkuAPQm5p00mxTXbzmU');
require('dotenv').config()
mongoose.connect('mongodb://localhost:27017/Tharbcamel')
.then(res=>{
    console.log("connection successsfull")
})
.catch(err=>{
    console.log(err)
})

const userRouter = require('./router/userRouter')
const reportRouter = require('./router/reportRouter')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.get('/',(req,res)=>{
res.send("tharb up and running")
})
app.use('/api/user',userRouter)
app.use('/api/report',reportRouter)
app.use('/api/reportproject',reportProjectRouter)

const PORT = process.env.PORT || 3002

app.post("/donate", async (req, res) => {
    try {
      // Getting data from client
      let { amount, name } = req.body;
      // Simple validation
      if (!amount || !name)
        return res.status(400).json({ message: "All fields are required" });
      amount = parseInt(amount);
      // Initiate payment
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: "INR",
        payment_method_types: ["card"],
        metadata: { name },
      });
      // Extracting the client secret 
      const clientSecret = paymentIntent.client_secret;
      // Sending the client secret as response
      res.json({ message: "Payment initiated", clientSecret });
    } catch (err) {
      // Catch any error and send error 500 to client
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

app.listen(PORT,()=>{
    console.log("server started on 3002")
})