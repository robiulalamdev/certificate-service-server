const Job = require("./job.model");

const createJob = async (req, res) => {
  try {
    const { _id } = req.user;
    if (_id) {
      req.body["user"] = _id;
    }
    if (req.files) {
      let files = [];
      if (req.files?.pdf_documents) {
        for (let i = 0; i < req.files?.pdf_documents.length; i++) {
          files.push(req.files?.pdf_documents[i].path);
        }
        req.body["pdf_documents"] = files;
      }
    }
    const newNewJob = new Job(req.body);
    const result = await newNewJob.save();
    res.status(200).json({
      success: true,
      message: "Job Create Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Job Create Failed",
      error_message: error.message,
    });
  }
};

const getJobs = async (req, res) => {
  try {
    const result = await Job.find({}).sort({ _id: -1 });
    res.status(200).json({
      success: true,
      message: "Jobs Retrieve Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Jobs Retrieve Failed",
      error_message: error.message,
    });
  }
};

const getJobById = async (req, res) => {
  try {
    const result = await Job.findById({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Job Retrieve Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Job Retrieve Failed",
      error_message: error.message,
    });
  }
};

const UpdateJobById = async (req, res) => {
  try {
    if (req.files) {
      let files = [];
      if (req.files?.pdf_documents) {
        for (let i = 0; i < req.files?.pdf_documents.length; i++) {
          files.push(req.files?.pdf_documents[i].path);
        }
        req.body["pdf_documents"] = files;
      }
    }
    const result = await Job.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Job Update Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Job Update Failed",
      error_message: error.message,
    });
  }
};

const DeleteJobById = async (req, res) => {
  try {
    const result = await Job.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Job Delete Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Job Delete Failed",
      error_message: error.message,
    });
  }
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  UpdateJobById,
  DeleteJobById,
};
