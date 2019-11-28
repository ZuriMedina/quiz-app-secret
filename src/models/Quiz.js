import mongoose from 'mongoose'
const { Schema } = mongoose;

const QuizSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String,
    required: true
  },
  quizone: {type: String, required: true}, 
  quiztwo: {type: String, required: true},
  quizthree: {type: String, required: true},
  quizfour: {type: String, required: true},
  correct: {type: String, required: true},
  published: {type: Boolean, default: false},
  admin: {type: Boolean, default: true}
})

module.exports = mongoose.model('Quiz', QuizSchema)
