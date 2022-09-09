import orderController from '../controller/orderController.js';
import { Router } from 'express';
const router  =Router();



router.post('/addorder',orderController.addOrder);




export default router