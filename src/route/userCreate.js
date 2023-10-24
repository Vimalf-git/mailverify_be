import express from 'express'
import userCreate from '../controller/userCreate.js'
const router =express.Router();
router.post('/',userCreate.mailVerify)
export default router;

