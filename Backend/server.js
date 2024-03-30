// main app file
import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/useroute.js';
import authRoute from './routes/authroute.js';
import messageRoute from './routes/messageroute.js';
import connectToMongoDB from './db/connectToMongoDB.js';
import cookieParser from 'cookie-parser';
import {app, server} from './socket/socket.js'


dotenv.config();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send("Hello world!");
})

// Change this line
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server has started listening on ${PORT}`)
});