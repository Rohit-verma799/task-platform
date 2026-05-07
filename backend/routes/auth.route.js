import express from "express";
const router = express.Router();
import {Signup, Login, Logout} from '../controllers/auth.controller.js'

router.post('/Signup', Signup);
router.post('/Login', Login);
router.post('/Logout', Logout);


export default router