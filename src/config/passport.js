import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import User from '../models/user.js'
import dotenv from 'dotenv'

dotenv.config()

const options = {
  jwtFromRequest: ExtractJwt.fromExtractors([(req) => req.cookies.token]),
  secretOrKey: process.env.JWT_SECRET,
}

passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id)
      return user ? done(null, user) : done(null, false)
    } catch (error) {
      return done(error, false)
    }
  })
)

export default passport
