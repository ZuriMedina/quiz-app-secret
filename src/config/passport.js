import passport from 'passport'
import local from 'passport-local'

import User from '../models/User'

passport.use(new local({
  usernameField: 'email'
}, async (email, password, next) => {
  // Match Email's User
  const user = await User.findOne({email: email})
  if (!user) {
    return next(null, false, { message: 'Not User found.' })
  } else {
    // Match Password's User
    const match = await user.matchPassword(password)
    if(match) {
      return next(null, user)
    } else {
      return next(null, false, { message: 'Incorrect Password.' })
    }
  }
}))

passport.serializeUser((user, next) => {
  next(null, user.id)
})

passport.deserializeUser((id, next) => {
  User.findById(id, (err, user) => {
    next(err, user)
  })
})

passport.serializeUser((user, next) => {
  next(null, user.id)
})

passport.deserializeUser((id, next) => {
  User.findById(id, (err, user) => {
    next(err, user)
  })
})
