import express from 'express';
import userDataController from '../controller/userData.js';
import auth from '../common/auth.js';
const router =express.Router();

router.get('/',auth.validate,userDataController.getAllData);

export default router;