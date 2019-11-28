import express from 'express'
import Quiz from '../models/Quiz'
import User from '../models/User'
import { isAuthenticated } from '../middleware/auth'

const router = express.Router()

//All quizzes
router.get('/admin/quizzes', isAuthenticated, async (req, res) => {
  const quizzesAdmin = await Quiz.find({}).sort({date: 'desc'})
  res.render('admin/all-quizzes', { quizzesAdmin })
})

//All users
router.get('/admin/users', isAuthenticated, async (req, res) => {
  const usersAdmin = await User.find({})
  res.render('admin/users', { usersAdmin })
})

// Delete users
router.delete('/admin/users/delete/:id', isAuthenticated, async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
  req.flash('success_msg', 'Quiz Deleted Successfully')
  res.redirect('/admin/users')
})

//Add user
router.get('/admin/add', isAuthenticated, (req, res) => {
    res.render('admin/new-user')
  })

router.post('/admin/users/new-user', isAuthenticated, async (req, res) => {
  let errors = []
  const { name, email, password, admin, confirm_password} = req.body
  if(password != confirm_password) {
    errors.push({text: 'Passwords do not match.'})
  }
  if(password.length < 4) {
    errors.push({text: 'Passwords must be at least 4 characters.'})
  }
  if(errors.length > 0){
    res.render('admin/users', {errors, name, email, password, admin, confirm_password})
  } else {
    // Email coincidence
    const emailUser = await User.findOne({email: email})
    if(emailUser) {
      req.flash('error_msg', 'The Email is already in use.')
      res.redirect('/admin/users')
    } else {
      // Saving
      const newUser = new User({name, email, password, admin})
      newUser.password = await newUser.encryptPassword(password)
      await newUser.save()
      req.flash('success_msg', 'User created.')
      res.redirect('/admin/users')
    }
  }
})

router.get('/admin/edit/:id', isAuthenticated, async (req, res) => {
  const userAdmin = await User.findById(req.params.id)
  res.render('admin/edit-user', { userAdmin })
})

router.put('/admin/edit-user/:id', isAuthenticated, async (req, res) => {
  const { name, email, password} = req.body
  await User.findByIdAndUpdate(req.params.id, {name, email, password})
  req.flash('success_msg', 'Quiz Updated Successfully')
  res.redirect('/admin/users')
})

module.exports = router