const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')


router.get('/',userController.getUser)
router.post('/createUser',userController.createUser)
router.post('/login',userController.logIn)

module.exports=router;