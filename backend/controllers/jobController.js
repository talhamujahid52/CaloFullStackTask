const { getJobs, AddJob, UpdateJob } = require("../model/jobModel");
const { fetchRandomImage, getRandomDelay } = require("../utils");

const createJob = async (req, res, io) => {
  try {
    const jobs = getJobs();
    const jobId = jobs.length + 1;
    const newJob = {
      id: jobId,
      status: "pending",
      result: null,
      createdAt: new Date().toISOString(),
      resolvedAt: null,
    };

    AddJob(newJob);

    setTimeout(async () => {
      const jobsList = getJobs();
      const imageUrl = await fetchRandomImage();
      const jobToUpdate = jobsList.find((item) => item.id === newJob.id);

      jobToUpdate.status = "resolved";
      jobToUpdate.result = imageUrl;
      jobToUpdate.resolvedAt = new Date().toISOString();

      UpdateJob(jobsList);
      io.emit("jobResolved", { message: "Job Resolved Successfully" });
    }, getRandomDelay());

    res.status(201).json({ id: jobId });
  } catch (err) {
    // console.error("Error in creating job or getting image:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllJobs = (req, res) => {
  const jobs = getJobs();
  const response = jobs.map((job) => {
    const baseResponse = {
      id: job.id,
      status: job.status,
    };

    if (job.status !== "pending") {
      baseResponse.result = job.result;
      baseResponse.createdAt = job.createdAt;
      baseResponse.resolvedAt = job.resolvedAt;
    }

    return baseResponse;
  });

  res.json(response);
};

const getJobById = (req, res) => {
  const jobId = Number(req.params.id);
  const jobs = getJobs();
  const job = jobs.find((j) => j.id === jobId);
  if (!job) return res.status(404).send("Job not found");

  const baseResponse = {
    id: job.id,
    status: job.status,
  };

  if (job.status !== "pending") {
    baseResponse.result = job.result;
    baseResponse.createdAt = job.createdAt;
    baseResponse.resolvedAt = job.resolvedAt;
  }
  res.json(baseResponse);
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
};
