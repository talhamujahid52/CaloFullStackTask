const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

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

app.use(cors());
app.use("/api", jobRoutes(io));

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
