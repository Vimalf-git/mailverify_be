import express from 'express';
import userCreate from './userCreate.js'
import forget from './forget.js'
import login from './login.js';
import userData from './userData.js'
const router=express();

router.use('/usercreate',userCreate)
router.use('/forgetpass',forget)
router.use('/login',login)
router.use('/getAll',userData)
export default router;