// create a express server!
import express from "express"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authroutes.js";
import messageRoutes from "./routes/messageroutes.js";
import userRoutes from "./routes/userroutes.js";


import connectToMongoDB from "./db/connectToMongoDB.js";
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

// app.get("/",(req, res) => {
//     // root route http://localhost:5000/
//     res.send("Hello world!!");
// });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);



/* app.get("/api/auth/signup", (req, res)=>{
    console.log("signup route");
});

app.get("/api/auth/login", (req, res)=>{
    console.log("login route");
});

app.get("/api/auth/logout", (req, res)=>{
    console.log("logout route");
});
*/



app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`server Running on port ${PORT}`)
});
