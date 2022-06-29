import {Router} from 'express'
import controller from '../controllers/groups.js'



const router = Router()

router.get('/groups', controller.GET)
router.get('/groups/:groupId', controller.GET)
router.post('/groups', controller.POST)
router.delete('/groups/:groupId', controller.DELETE)


export default router