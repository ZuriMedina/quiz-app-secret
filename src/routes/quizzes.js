import express from 'express'
import Quiz from '../models/Quiz'
import { isAuthenticated } from '../middleware/auth'

const router = express.Router()

router.get('/quizzes/add', isAuthenticated, (req, res) => {
  res.render('quizzes/new-quiz')
})

router.post('/quizzes/new-quiz', isAuthenticated, async (req, res) => {
  const { title, description, quizone, quiztwo, quizthree, quizfour, correct, published, admin} = req.body
  const errors = []
  if (!title) {
    errors.push({text: 'Please Write a Title.'})
  }
  if (!description) {
    errors.push({text: 'Please Write a Description'})
  }
  if (errors.length > 0) {
    res.render('quizzes/new-quiz', {
      errors,
      title,
      description
    })
  } else {
    const newQuiz = new Quiz({title, description, quizone, quiztwo, quizthree, quizfour, correct, published, admin})
    newQuiz.user = req.user.id
    await newQuiz.save()
    req.flash('success_msg', 'Quiz Added Successfully')
    res.redirect('/quizzes')
  }
})

// Get
router.get('/quizzes', isAuthenticated, async (req, res) => {
  const quizzes = await Quiz.find({published: true}).sort({date: 'desc'})
  res.render('quizzes/all-quizzes', { quizzes })
})

// Edit
router.get('/quizzes/edit/:id', isAuthenticated, async (req, res) => {
  const quiz = await Quiz.findById(req.params.id)
  if(quiz.user != req.user.id) {
    req.flash('error_msg', 'Not Authorized')
    return res.redirect('/quizzes')
  } 
  res.render('quizzes/edit-quiz', { quiz })
})

router.put('/quizzes/edit-quiz/:id', isAuthenticated, async (req, res) => {
  const { title, description, quizone, quiztwo, quizthree, quizfour, correct, published, admin } = req.body
  await Quiz.findByIdAndUpdate(req.params.id, {title, description, quizone, quiztwo, quizthree, quizfour, correct, published, admin})
  req.flash('success_msg', 'Quiz Updated Successfully')
  res.redirect('/quizzes')
})

// Delete
router.delete('/quizzes/delete/:id', isAuthenticated, async (req, res) => {
  await Quiz.findByIdAndDelete(req.params.id)
  req.flash('success_msg', 'Quiz Deleted Successfully')
  res.redirect('/admin/quizzes')
})



module.exports = router
