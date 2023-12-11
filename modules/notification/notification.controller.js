const Notification = require("./notification.model");

const createNotification = async (req, res) => {
  try {
    const { _id } = req.user;
    if (_id) {
      req.body["user"] = _id;
      const newNotification = new Notification(req.body);
      const result = await newNotification.save();
      res.status(200).json({
        success: true,
        message: "Notification Create Success",
        data: result,
      });
    }
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Notification Create Failed",
      error_message: error.message,
    });
  }
};

const getNotifications = async (req, res) => {
  try {
    const result = await Notification.find({}).sort({ _id: -1 });
    res.status(200).json({
      success: true,
      message: "Notifications Retrieve Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Notifications Retrieve Failed",
      error_message: error.message,
    });
  }
};

const getNotificationById = async (req, res) => {
  try {
    const result = await Notification.findById({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Notification Retrieve Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Notification Retrieve Failed",
      error_message: error.message,
    });
  }
};

const updateNotificationById = async (req, res) => {
  try {
    const result = await Notification.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Notification Update Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Notification Update Failed",
      error_message: error.message,
    });
  }
};

const deleteNotificationById = async (req, res) => {
  try {
    const result = await Notification.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Notification Delete Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Notification Delete Failed",
      error_message: error.message,
    });
  }
};

module.exports = {
  createNotification,
  getNotifications,
  getNotificationById,
  updateNotificationById,
  deleteNotificationById,
};
