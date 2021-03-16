import express, { json } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";
import loginRoute from "./routes/loginRoutes.js";
import registerRoute from "./routes/registerRoutes.js";
import postRoute from "./routes/postRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import AppError from "./utils/appError.js";
import { Server } from "socket.io";
import globalErrorHandler from "./utils/globalErrorHandler.js";
const PORT = 5000;
dotenv.config();
const app = express();

const httpServer = app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT} `)
);

const io = new Server(httpServer, { pingTimeout: 60000 });

connectDB();

app.use(json());

app.get("/", (req, res) => {
  console.log("API Is Running....");
});
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/api/posts", postRoute);
app.use("/api/profile", profileRoutes);
app.use("/api/users", userRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(
  "/uploads",
  express.static(path.join(path.resolve(), "/uploads/images"))
);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server `, 404));
});

app.use(globalErrorHandler);

io.on("connection", (socket) => {
  socket.on("setup", (userInfo) => {
    socket.join(userInfo._id);
    socket.emit("connected");
  });

  socket.on("join room", (room) => socket.join(room));
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
});
