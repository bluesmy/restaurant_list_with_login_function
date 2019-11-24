const express = require('express')               // 載入 express
const app = express()                            // 建立 express instance
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')

// 設定 bodyParser
app.use(bodyParser.urlencoded({ extended: true }))

// 告訴 express 使用 handlebars 當作 template engine 並預設 layout 是 main
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    ifEquals: function (arg1, arg2, options) { return (arg1 == arg2) ? options.fn(this) : options.inverse(this) }
  }
}))
app.set('view engine', 'handlebars')

// 設定 method-override
app.use(methodOverride('_method'))

app.use(express.static('public'))

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

// mongoose 連線後透過 mongoose.connection 拿到 Connection 的物件
const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 載入 restaurant model
const Restaurant = require('./models/restaurant.js')

app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: true
}))

// 使用 Passport 
app.use(passport.initialize())
app.use(passport.session())

// 載入 Passport config
require('./config/passport')(passport)

app.use(flash())

app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.fail_msg = req.flash('fail_msg')
  next()
})

// 載入路由器
app.use('/', require('./routes/home'))
app.use('/restaurants', require('./routes/restaurant'))
app.use('/search', require('./routes/search'))
app.use('/sort', require('./routes/sort'))
app.use('/users', require('./routes/user'))
app.use('/auth', require('./routes/auths'))

// 設定 express port 3000
app.listen(3000, () => {
  console.log('App is running')
})