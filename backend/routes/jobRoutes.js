const express = require("express");
const router = express.Router();
const {
  createJob,
  getAllJobs,
  getJobById,
} = require("../controllers/jobController");

const jobRoutes = (io) => {
  router.post("/jobs", (req, res) => createJob(req, res, io)); // Pass io here
  router.get("/jobs", (req, res) => getAllJobs(req, res, io)); // Pass io here
  router.get("/jobs/:id", (req, res) => getJobById(req, res, io)); // Pass io here

  return router;
};

module.exports = jobRoutes;
