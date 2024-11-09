import {Router} from 'express'
import { registerUser } from '../controllers/controller.js'

const routerR = Router()

routerR.post('/', registerUser)

export default routerR
