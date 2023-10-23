import express from 'express';
import userDataController from '../controller/userData.js';

const router =express.Router();

router.get('/',userDataController.getAllData);

export default router;