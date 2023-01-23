const express = require('express')
const router = express.Router();
const reportController = require('../controllers/reportController')
const isUserAuth = require("../middlewares/isUserAuth")


router.get('/getAllReports',isUserAuth,reportController.getAllReports)
router.get('/getOldReports',reportController.getOldReports)
router.get('/getOldProjectReports',reportController.getOldProjectReports)
router.post('/createReport',isUserAuth,reportController.createReport)
router.post('/storeOldReport',reportController.storeOldReport)
router.post('/saveReport',isUserAuth,reportController.saveReport)
router.post('/deleteReport',isUserAuth,reportController.deleteReport)
router.post('/searchReport',isUserAuth,reportController.searchReport)
router.get('/getSingleReportId',isUserAuth,reportController.getSingleReportId)

module.exports=router;