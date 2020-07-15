import express from 'express';
import controller from '../controllers/controller';
const router = express.Router();

router.use('/', controller);

export default router;
