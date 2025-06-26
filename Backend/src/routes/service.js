const express = require("express");
const router = express.Router();
const serviceController = require("../app/controllers/serviceController");

router.get("/getAllServices", serviceController.gettAllServices);
router.get("/getServicePrice", serviceController.getAllServicePrice);
router.post("/createWeightRange", serviceController.createWeightRange);
router.post("/createService", serviceController.createService);
router.post("/createServicePrice", serviceController.createServicePrice);
router.delete("/:id", serviceController.deleteService);
router.delete("/deleteServicePrice", serviceController.deleteServicePrice);
router.delete("/deleteWeightRange", serviceController.deleteWeightRange);
router.put("/updateService/:id", serviceController.editService);
router.post("/updateServicePrice", serviceController.editServicePrice);
router.post("/updateWeightRange", serviceController.editWeightRange);
router.get("/:id", serviceController.getServiceById);
router.get("/getServiceByUserId/:userId", serviceController.getServiceByUserId);

module.exports = router;
