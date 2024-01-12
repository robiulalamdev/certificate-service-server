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
  upload.fields([
    { name: "document_1", maxCount: 1 },
    { name: "document_2", maxCount: 1 },
    { name: "document_3", maxCount: 1 },
    { name: "document_4", maxCount: 1 },
    { name: "document_5", maxCount: 1 },
    { name: "document_6", maxCount: 1 },
    { name: "ballot", maxCount: 1 },
    { name: "proof_of_claim", maxCount: 1 },
    { name: "own_mailing_list_file", maxCount: 1 },
  ]),
  handleMulterError,
  createJob
);
router.get("/", isAuth, getJobs);
router.get("/:id", getJobById);
// router.patch(
//   "/:id",
//   upload.fields([{ name: "pdf_documents", maxCount: 6 }]),
//   handleMulterError,
//   UpdateJobById
// );
router.delete("/:id", isAuth, DeleteJobById);

module.exports = router;
