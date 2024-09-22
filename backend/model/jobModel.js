const fs = require("fs");
const path = require("path");

const JOBS_FILE = path.join(__dirname, "..", "jobs.json");

const readJSONFile = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    return [];
  }
};

const writeJSONFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const getJobs = () => readJSONFile(JOBS_FILE);

const AddJob = (job) => {
  const jobs = getJobs();
  jobs.push(job);
  writeJSONFile(JOBS_FILE, jobs);
};

const UpdateJob = (jobs) => {
  writeJSONFile(JOBS_FILE, jobs);
};

module.exports = {
  getJobs,
  AddJob,
  UpdateJob,
};
