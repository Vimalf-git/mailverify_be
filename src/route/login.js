import loginController from "../controller/login.js";
import express from 'express';

const router=express.Router();
router.post('/',loginController.login)

export default router
