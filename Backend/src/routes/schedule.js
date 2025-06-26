const express = require('express')
const router = express.Router();
const scheduleController = require('../app/controllers/scheduleController')

router.get('/get', scheduleController.getAllSchedules);
router.post('/create', scheduleController.createSchedule);
router.get('/get/:id', scheduleController.getScheduleById);
router.post('/update/:id', scheduleController.updateSchedule);
router.delete('/delete/:id', scheduleController.deleteSchedule);
router.get('/getByUserId/:userId', scheduleController.getScheduleByUserId);
router.get('/getByShopId/:shopId', scheduleController.getScheduleByShopId);
router.get("/by-date/:serviceId", scheduleController.getSchedulesByDate);

module.exports = router;