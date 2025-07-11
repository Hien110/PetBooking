const Schedule = require("../models/Schedule");

class scheduleController {
  async updateStatusSchedule(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedSchedule = await Schedule.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      if (!updatedSchedule) {
        return res.status(404).json({ message: "Schedule not found" });
      }
      return res.status(200).json(updatedSchedule);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async getAllSchedules(req, res) {
    try {
      const schedules = await Schedule.find()
        .populate("userId")
        .populate("serviceId")
        .populate("shopId");
      return res.status(200).json(schedules);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async createSchedule(req, res) {
    try {
      const { userId, serviceId, shopId, time, note } = req.body;
      const newSchedule = new Schedule({
        userId,
        serviceId,
        shopId,
        time,
        note,
        status: "pending", // Default status
      });
      await newSchedule.save();
      return res.status(201).json(newSchedule);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async getScheduleById(req, res) {
    try {
      const { id } = req.params;
      const schedule = await Schedule.findById(id)
        .populate("userId")
        .populate("serviceId")
        .populate("shopId");
      if (!schedule) {
        return res.status(404).json({ message: "Schedule not found" });
      }
      return res.status(200).json(schedule);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async updateSchedule(req, res) {
    try {
      const { id } = req.params;
      const { userId, serviceId, shopId, time } = req.body;
      const updatedSchedule = await Schedule.findByIdAndUpdate(
        id,
        {
          userId,
          serviceId,
          shopId,
          time,
        },
        { new: true }
      );
      if (!updatedSchedule) {
        return res.status(404).json({ message: "Schedule not found" });
      }
      return res.status(200).json(updatedSchedule);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async deleteSchedule(req, res) {
    try {
      const { id } = req.params;
      const deletedSchedule = await Schedule.findByIdAndDelete(id);
      if (!deletedSchedule) {
        return res.status(404).json({ message: "Schedule not found" });
      }
      return res.status(200).json({ message: "Schedule deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }
  async getScheduleByUserId(req, res) {
    try {
      const { userId } = req.params;
      const schedules = await Schedule.find({ userId })
        .populate("userId")
        .populate("serviceId")
        .populate("shopId");
      if (!schedules) {
        return res
          .status(404)
          .json({ message: "No schedules found for this user" });
      }
      return res.status(200).json(schedules);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }
  async getScheduleByShopId(req, res) {
    try {
      const { shopId } = req.params;
      const schedules = await Schedule.find({ shopId })
        .populate("userId")
        .populate("serviceId")
        .populate("shopId");
      if (!schedules) {
        return res
          .status(404)
          .json({ message: "No schedules found for this shop" });
      }
      return res.status(200).json(schedules);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async getSchedulesByDate(req, res) {
    try {
      const { serviceId } = req.params;
      const { date } = req.query;

      if (!date || !serviceId) {
        return res.status(400).json({ message: "Thiếu date hoặc serviceId" });
      }

      // Tính khoảng thời gian từ 00:00 đến 23:59:59 của ngày đó
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const schedules = await Schedule.find({
        serviceId,
        time: { $gte: startOfDay, $lte: endOfDay },
      }).populate("userId", "name");

      return res.status(200).json(schedules);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }
}
module.exports = new scheduleController();
