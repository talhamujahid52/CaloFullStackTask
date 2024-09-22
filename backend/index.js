const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const Queue = require("bull");
const { getJobs, UpdateJob } = require("./model/jobModel");
const { fetchRandomImage, getRandomDelay } = require("./utils");

const jobRoutes = require("./routes/jobRoutes");
const port = 4000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const jobQueue = new Queue("jobQueue");

app.use(cors());
app.use("/api", jobRoutes(io, jobQueue));

// Job processing logic
jobQueue.process(async (job) => {
  const { jobId } = job.data;
  const jobsList = getJobs();

  // Simulating a random delay before processing the job
  const delay = getRandomDelay();
  await new Promise((resolve) => setTimeout(resolve, delay));

  const imageUrl = await fetchRandomImage();
  const jobToUpdate = jobsList.find((item) => item.id === jobId);

  jobToUpdate.status = "resolved";
  jobToUpdate.result = imageUrl;
  jobToUpdate.resolvedAt = new Date().toISOString();

  UpdateJob(jobsList);
  // Emit job resolution event
  io.emit("jobResolved", { message: "Job Resolved Successfully", jobId });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
