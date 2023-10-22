import express from 'express'
import verify from '../controller/verify.js'
const mail =express();

const router =express.Router();
router.post('/',verify.mailVerify)
export default router;

