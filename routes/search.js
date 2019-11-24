const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
const sortConditions = require('../public/javascripts/sortConditions')
const { authenticated } = require('../config/auth')

// 搜尋 Restaurant
router.get('/', authenticated, (req, res) => {
  const keywordRegex = new RegExp(req.query.keyword, 'i')
  Restaurant.find(
    {
      userId: req.user._id,
      $or: [
        { name: { $regex: keywordRegex, $options: "$i" } },
        { category: { $regex: keywordRegex } }
      ]
    })
    .sort({ name: 1 })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { restaurants, keyword: req.query.keyword, sortConditions, sortCondition: req.params.sortCondition, sortName: req.params.sortName, sortOrder: req.params.sortOrder, sortOrderName: req.params.sortOrderName })
    })
})

module.exports = router