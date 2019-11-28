import express from 'express'
import exphbs from 'express-handlebars'
import methodOverride from 'method-override'
import session from 'express-session'
import flash from 'connect-flash'
import passport from 'passport'

import index from './routes'
import users from './routes/users'
import quizzes from './routes/quizzes'
import admin from './routes/admin'

import './config/database'
import './config/passport'

const app = express()

app.set('port', process.env.PORT || 5000)
app.set('views', 'src/views')
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: 'src/views/layouts',
  partialsDir: 'src/views/partials',
  extname: '.hbs'
}))

app.set('view engine', '.hbs')

// Middlewares
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Global flash
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next()
})

// routes
app.use('/', index)
app.use('/', users)
app.use('/', quizzes)
app.use('/', admin)

app.use(express.static('src/public'))

app.listen(app.get('port'), () => {
  console.log(`Server running on http://localhost:${app.get('port')}`)
})