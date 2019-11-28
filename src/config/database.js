import mongoose from 'mongoose'

mongoose.set('useFindAndModify', false)
mongoose.connect('mongodb+srv://root:root@cluster0-wpwha.mongodb.net/test?retryWrites=true&w=majority', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(db => console.log('MongoDB is connected'))
  .catch(err => console.error(err))
