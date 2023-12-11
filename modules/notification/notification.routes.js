const express = require("express");
const { isAuth } = require("../../utils/middleware");
const {
  createNotification,
  getNotifications,
  getNotificationById,
  updateNotificationById,
  deleteNotificationById,
} = require("./notification.controller");
const router = express.Router();

router.post("/create", isAuth, createNotification);
router.get("/", isAuth, getNotifications);
router.get("/:id", isAuth, getNotificationById);
router.patch("/:id", isAuth, updateNotificationById);
router.delete("/:id", isAuth, deleteNotificationById);

module.exports = router;
