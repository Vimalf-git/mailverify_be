import express from 'express';
import mail from './verify.js'
import forget from './forget.js'
const router=express();

router.use('/mailverify',mail)
router.use('/forgetpass',forget)
export default router;