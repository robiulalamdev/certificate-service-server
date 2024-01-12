const Notification = require("./notification.model");

const createNotify = async (data) => {
  const newNotification = new Notification(data);
  const result = await newNotification.save();
  return result;
};

module.exports = {
  createNotify,
};
