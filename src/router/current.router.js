import {Router} from 'express'
import passport from 'passport'

const routerC = Router()

routerC.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    email: req.user.email,
    age: req.user.age,
    role: req.user.role,
  })
})

export default routerC
