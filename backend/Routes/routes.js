import { Router } from "express";
import { genSalt, hash, compare } from "bcryptjs";
import auth from "../../middleware/auth";
import { sign } from "jsonwebtoken";
import { get } from "config";
import { check, validationResult } from "express-validator";
import User, { findOne, findById } from "../../models/User";
import normalize from "normalize-url";
import { url } from 'gravatar';
import { login, signup } from "../Controllers/register";
import { addfriends, confirmfriends,deletefriends } from "../Controllers/friends";


const router = Router();

router.post("/signup",signup);
router .post("/login",login);


router.get("/", auth, async (req, res) => {
  try {
    const user = await findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  
);