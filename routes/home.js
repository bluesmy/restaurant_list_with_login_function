const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
const sortConditions = require('../public/javascripts/sortConditions')
const { authenticated } = require('../config/auth')

// Restaurant 首頁
router.get('/', authenticated, (req, res) => {
  Restaurant.find({ userId: req.user._id }, (err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants, sortConditions, sortCondition: req.params.sortCondition, sortName: req.params.sortName, sortOrder: req.params.sortOrder, sortOrderName: req.params.sortOrderName })
  })
})

module.exports = router