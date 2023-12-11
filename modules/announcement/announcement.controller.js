const Announcement = require("./announcement.model");

const createAnnouncement = async (req, res) => {
  try {
    const newAnnouncement = new Announcement(req.body);
    const result = await newAnnouncement.save();
    res.status(200).json({
      success: true,
      message: "announcement Create Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "announcement Create Failed",
      error_message: error.message,
    });
  }
};

const getAnnouncements = async (req, res) => {
  try {
    const result = await Announcement.find({}).sort({ _id: -1 });
    res.status(200).json({
      success: true,
      message: "announcements Retrieve Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "announcements Retrieve Failed",
      error_message: error.message,
    });
  }
};

const getAnnouncementById = async (req, res) => {
  try {
    const result = await Announcement.findById({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Announcement Retrieve Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Announcement Retrieve Failed",
      error_message: error.message,
    });
  }
};

const updateAnnouncementById = async (req, res) => {
  try {
    const result = await Announcement.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Announcement Update Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Announcement Update Failed",
      error_message: error.message,
    });
  }
};

const deleteAnnouncementById = async (req, res) => {
  try {
    const result = await Announcement.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Announcement Delete Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Announcement Delete Failed",
      error_message: error.message,
    });
  }
};

module.exports = {
  createAnnouncement,
  getAnnouncements,
  getAnnouncementById,
  updateAnnouncementById,
  deleteAnnouncementById,
};
