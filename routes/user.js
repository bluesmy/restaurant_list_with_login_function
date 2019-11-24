const express = require('express')
const router = express.Router()
const User = require('../models/user')

// login page
router.get('/login', (req, res) => {
  res.render('login')
})

// login check
router.post('/login', (req, res) => {
  res.send('login')
})

// register page
router.get('/register', (req, res) => {
  res.render('register')
})

// register check
router.post('/register', (req, res) => {
  res.send('register')
})

// log out
router.get('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router