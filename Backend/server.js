const express = require('express')
const app = express()
const cors = require("cors")
const PORT =  8080
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const flash = require('express-flash')

const { join } = require('path');

app.use(express.json());
app.use(cors());
app.use(express.static('Uploads'));

app.use(express.urlencoded({extended:false}));

// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/WEB-Project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on('error', (err) => {
  console.error('Connection failed...', err);
});

connection.once('open', () => {
  console.log('Database connected...');
});

// Session config including store configuration
app.use(session({
  secret: "SKPSMPSAP",
  resave: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/userDB', 
    ttl: 60 * 60 * 24, 
  }),
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// Passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())


require('./routes/web')(app)

const staticPostersFilesDirectory = join(__dirname, 'Uploads', 'posters');

app.use('/Uploads/posters', express.static(staticPostersFilesDirectory));

app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

app.listen(PORT , () => {
    console.log(`Listening on port ${PORT}`)
})


    
        
          