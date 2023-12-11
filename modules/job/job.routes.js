const express = require("express");
const { handleMulterError, upload } = require("../../config/multerConfig");
const {
  createJob,
  getJobs,
  getJobById,
  DeleteJobById,
  UpdateJobById,
} = require("./job.controller");
const { isAuth } = require("../../utils/middleware");
const router = express.Router();

router.post(
  "/create",
  isAuth,
  upload.fields([{ name: "pdf_documents", maxCount: 6 }]),
  handleMulterError,
  createJob
);
router.get("/", getJobs);
router.get("/:id", getJobById);
router.patch(
  "/:id",
  upload.fields([{ name: "pdf_documents", maxCount: 6 }]),
  handleMulterError,
  UpdateJobById
);
router.delete("/:id", DeleteJobById);

module.exports = router;
