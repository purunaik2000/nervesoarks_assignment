import express from "express";
import {login, register} from "./controllers/userControllers.mjs";
import {authentication, authorisation} from "./middlewares/auth.mjs";

const router = express.Router();

router.get("/test", (req, res)=>res.send("working fine"));

router.post("/register", register);
router.post("/login", login);

export default router;
