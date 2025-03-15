require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const complianceRoutes = require("../routes/compliance");
const authRoutes = require("../routes/auth");
const userRoutes = require("../routes/user");
const complain = require("../routes/complain");
const chatbotRoutes = require("../routes/chatbot");

const app = express();
app.use(bodyParser.json());
app.use(express.json());

// CORS setup
app.use(cors());

app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(200); // Respond with 200 OK
});

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/public_grievance_system", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/compliance", complianceRoutes);
app.use("/api/complain", complain);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chatbot", chatbotRoutes);

const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Socket.IO setup
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }, // React app's URL
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running with Socket.IO on port ${PORT}`);
});
