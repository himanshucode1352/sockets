import { Router } from "express";
import controller from '../controller/m_orderController.js'
const router = Router();



router.post('/add',controller.addOrder)
//router.post('/sell',controller.sellOrder)
router.get('/getorders',controller.getOrder)
router.get('/getchartdata',controller.getChartData)







export default router