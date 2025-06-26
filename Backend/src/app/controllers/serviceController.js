const Service = require("../models/Service");
const ServicePrice = require("../models/ServicePrice");
const WeightRange = require("../models/WeightRange");

class serviceController {
  async gettAllServices(req, res) {
    try {
      const services = await Service.find()
        .populate("userId");
      return res.status(200).json(services);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async getAllServicePrice(req, res) {
    try {
      const servicePrice = await ServicePrice.find()
        .populate({ path: "serviceId", populate: [{ path: "image" }] })
        .populate("weightRange");
      return res.status(200).json(servicePrice);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async createWeightRange(req, res) {
    try {
      const { minWeight, maxWeight } = req.body;
      if (minWeight >= maxWeight) {
        return res
          .status(400)
          .json({ message: "Min weight must be less than max weight" });
      }
      const newWeightRange = new WeightRange({
        minWeight,
        maxWeight,
      });
      await newWeightRange.save();
      return res.status(201).json(newWeightRange);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async createService(req, res) {
    try {
      const { serviceName, userId, description, image, priceRange } = req.body;
      const newService = new Service({
        serviceName,
        userId,
        description,
        image,
        priceRange,
      });
      await newService.save();
      return res.status(201).json(newService);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async createServicePrice(req, res) {
    try {
      const { serviceId, price, weightRange } = req.body;
      const newServicePrice = new ServicePrice({
        serviceId,
        price,
        weightRange,
      });
      await newServicePrice.save();
      return res.status(201).json(newServicePrice);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async deleteService(req, res) {
    try {
      const { id } = req.params;
      const deletedService = await Service.findByIdAndDelete(id);
      if (!deletedService) {
        return res.status(404).json({ message: "Service not found" });
      }
      return res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async deleteServicePrice(req, res) {
    try {
      const { servicePriceId } = req.body;
      const deletedServicePrice = await ServicePrice.findByIdAndDelete(
        servicePriceId
      );
      if (!deletedServicePrice) {
        return res.status(404).json({ message: "Service price not found" });
      }
      return res
        .status(200)
        .json({ message: "Service price deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async deleteWeightRange(req, res) {
    try {
      const { weightRangeId } = req.body;
      const deletedWeightRange = await WeightRange.findByIdAndDelete(
        weightRangeId
      );
      if (!deletedWeightRange) {
        return res.status(404).json({ message: "Weight range not found" });
      }
      return res
        .status(200)
        .json({ message: "Weight range deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async editService(req, res) {
    try {
      const { id } = req.params;
      const { serviceName, userId, description, image, priceRange } = req.body;
      const updatedService = await Service.findByIdAndUpdate(
        id,
        { serviceName, userId, description, image, priceRange },
        { new: true }
      );
      if (!updatedService) {
        return res.status(404).json({ message: "Service not found" });
      }
      return res.status(200).json(updatedService);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async editServicePrice(req, res) {
    try {
      const { servicePriceId, serviceId, price, weightRange } = req.body;
      const updatedServicePrice = await ServicePrice.findByIdAndUpdate(
        servicePriceId,
        { serviceId, price, weightRange },
        { new: true }
      );
      if (!updatedServicePrice) {
        return res.status(404).json({ message: "Service price not found" });
      }
      return res.status(200).json(updatedServicePrice);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async editWeightRange(req, res) {
    try {
      const { weightRangeId, minWeight, maxWeight } = req.body;
      if (minWeight >= maxWeight) {
        return res
          .status(400)
          .json({ message: "Min weight must be less than max weight" });
      }
      const updatedWeightRange = await WeightRange.findByIdAndUpdate(
        weightRangeId,
        { minWeight, maxWeight },
        { new: true }
      );
      if (!updatedWeightRange) {
        return res.status(404).json({ message: "Weight range not found" });
      }
      return res.status(200).json(updatedWeightRange);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }
  async getServiceById(req, res) {
    try {
      const { id } = req.params;
      const service = await Service.findById(id).populate("userId");
      return res.status(200).json(service);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async getServiceByUserId(req, res) {
    try {
      const { userId } = req.params;
      const services = await Service.find({ userId })
        .populate("userId");
      return res.status(200).json(services);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }
}

module.exports = new serviceController();
