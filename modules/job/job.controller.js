const { createNotify } = require("../notification/notification.service");
const Job = require("./job.model");

const createJob = async (req, res) => {
  try {
    const newData = await JSON.parse(req.body.data);
    const { _id } = req.user;
    if (_id) {
      newData["user"] = _id;
    }
    if (req.files.document_1) {
      newData.pdf_documents.document_1["attach"] = req.files.document_1[0].path;
    }
    if (req.files.document_2) {
      newData.pdf_documents.document_2["attach"] = req.files.document_2[0].path;
    }
    if (req.files.document_3) {
      newData.pdf_documents.document_3["attach"] = req.files.document_3[0].path;
    }
    if (req.files.document_4) {
      newData.pdf_documents.document_4["attach"] = req.files.document_4[0].path;
    }
    if (req.files.document_5) {
      newData.pdf_documents.document_5["attach"] = req.files.document_5[0].path;
    }
    if (req.files.document_6) {
      newData.pdf_documents.document_6["attach"] = req.files.document_6[0].path;
    }
    if (req.files.ballot) {
      newData.pdf_documents.ballot["attach"] = req.files.ballot[0].path;
    }
    if (req.files.proof_of_claim) {
      newData.pdf_documents.proof_of_claim["attach"] =
        req.files.proof_of_claim[0].path;
    }
    if (req.files.own_mailing_list_file) {
      newData.user_supplied_address_list["own_mailing_list_file"] =
        req.files.own_mailing_list_file[0].path;
    }
    const newNewJob = new Job(newData);
    await createNotify({
      user: _id,
      title: "New Mail!",
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using",
      type: "Job",
      target_id: newNewJob?._id,
    });
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
    let query = {};
    if (req.user?.role === "Admin") {
      query = {};
    } else {
      query = { user: req.user._id };
    }
    const result = await Job.find(query).sort({ _id: -1 }).limit(3);
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
