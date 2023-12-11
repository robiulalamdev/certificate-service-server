const express = require("express");
const { isAuth } = require("../../utils/middleware");
const {
  createAnnouncement,
  getAnnouncements,
  getAnnouncementById,
  updateAnnouncementById,
  deleteAnnouncementById,
} = require("./announcement.controller");
const router = express.Router();

router.post("/create", isAuth, createAnnouncement);
router.get("/", isAuth, getAnnouncements);
router.get("/:id", isAuth, getAnnouncementById);
router.patch("/:id", isAuth, updateAnnouncementById);
router.delete("/:id", isAuth, deleteAnnouncementById);

module.exports = router;
