import express from 'express'
import verify from '../controller/userCreate.js'
const router =express.Router();
router.post('/',verify.mailVerify)
export default router;

