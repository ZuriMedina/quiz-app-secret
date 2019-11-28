# quiz-app-secret

## Project setup
```
npm install
```

### Compiles and hot-reloads for development with nodemon
```
npm run dev
```

### MongoDB

if you want to use your own local MongoDB you should change the code in database.js archive into config folder.
```
mongoose.connect('mongodb+srv://root:root@cluster0-wpwha.mongodb.net/test?retryWrites=true&w=majority', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
```

### Login Admin

You should login as admin in order to have full access.

- User: admin
- Email: admin@admin.com
- Password: admin

### Create admin users

Into MongoDB database you should change the value of the property
```
"admin": true
```
His default value is false for new users.

