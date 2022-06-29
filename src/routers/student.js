import { Router } from "express";
import controller from '../controllers/student.js'


const router = Router()

router.get('/students', controller.GET)
router.get('/students/:studentId', controller.GET)
router.post('/students', controller.POST)
router.delete('/students/:studentId',controller.DELETE)


export default router