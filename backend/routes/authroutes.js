import express from "express";
import { login, logout, signup } from "../controllers/authcontroller.js";


const router = express.Router();

// router.get("/signup", (req, res)=> {
//     res.send("Signup Routes");
// });

// router.get("/login", (req, res)=> {
//     res.send("Login Routes");
// });

// router.get("/logout", (req, res)=> {
//         res.send("Logout Routes");
// }); --- insteadt of this we use Controllers ---

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);



export default router;