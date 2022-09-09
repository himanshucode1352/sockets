import controller from '../controller/userController.js'
import { Router } from 'express';
const router  =Router();


router.post('/adduser',controller.addUser);



export default router