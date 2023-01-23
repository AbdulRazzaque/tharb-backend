const express = require('express')
const router = express.Router();
const reportProjectController = require('../controllers/reportProjectController')
const isUserAuth = require("../middlewares/isUserAuth")


router.get('/getAllReports',isUserAuth,reportProjectController.getAllReports)
router.post('/createReport',isUserAuth,reportProjectController.createReport)
router.post('/saveReport',isUserAuth,reportProjectController.saveReport)
router.post('/deleteReport',isUserAuth,reportProjectController.deleteReport)
router.post('/searchReport',isUserAuth,reportProjectController.searchReport)
router.get('/getSingleReportId',isUserAuth,reportProjectController.getSingleReportId)

module.exports=router;