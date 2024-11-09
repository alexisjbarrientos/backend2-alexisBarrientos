import {Router} from 'express'
import { loginUser } from '../controllers/controller.js'

const routerL = Router()

routerL.post('/', loginUser)

export default routerL
