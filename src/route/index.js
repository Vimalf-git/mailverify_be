import express from 'express';
import mail from './userCreate.js'
import forget from './forget.js'
import login from './login.js';
import userData from './userData.js'
const router=express();

router.use('/mailverify',mail)
router.use('/forgetpass',forget)
router.use('/login',login)
router.use('/getAll',userData)
export default router;