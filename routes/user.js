const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

// login page
router.get('/login', (req, res) => {
  res.render('login')
})

// login check
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next)
})

// register page
router.get('/register', (req, res) => {
  res.render('register')
})

// register check
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body

  let errors = []

  if (!email || !password || !password2) {
    errors.push({ message: 'Email 及 Password 都是必填' })
  }

  if (password !== password2) {
    errors.push({ message: '密碼不一致' })
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ message: '這個 Email 已經註冊過了' })
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        })
      } else {
        const newUser = new User({
          name,
          email,
          password
        })

        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash

            newUser
              .save()
              .then(user => {
                req.flash('success_msg', '註冊成功！請登入後使用')
                res.redirect('/users/login')
              })
              .catch(err => console.log(err))
          })
        )
      }
    })
  }
})

// log out
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出')
  res.redirect('/users/login')
})

module.exports = router