import { Router } from "express";
import controller from '../controllers/studentGr.js'


const router = Router()

router.post('/addToGroup', controller.POST)
router.delete('/deleteFromGroup', controller.DELETE)


export default router