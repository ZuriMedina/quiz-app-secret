# quiz-app-secret

## Project setup
```
npm install
```

### Compiles and hot-reloads for development with nodemon
```
npm run dev
```

### How to use

if you want to use your own local database you should change the code in database.js archive into config folder.
```
mongoose.connect('mongodb+srv://root:root@cluster0-wpwha.mongodb.net/test?retryWrites=true&w=majority', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
```



