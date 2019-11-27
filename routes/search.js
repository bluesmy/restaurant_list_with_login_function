const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
const sortConditions = require('../public/javascripts/sortConditions')
const { authenticated } = require('../config/auth')

// 搜尋 & 排序 Restaurant
router.get('/', authenticated, (req, res) => {
  const keywordRegex = new RegExp(req.query.keyword, 'i')
  const sort = req.query.sort || 'name'
  const sortOrder = req.query.sortOrder || 'asc'
  const sortName = sortConditions.find(element => element.condition === sort).name || '名稱'
  const sortOrderName = sortConditions.find(element => element.order === sortOrder).orderName || '遞增'

  Restaurant.find(
    {
      userId: req.user._id,
      $or: [
        { name: { $regex: keywordRegex, $options: "$i" } },
        { category: { $regex: keywordRegex } }
      ]
    })
    .sort({ [sort]: [sortOrder] })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { restaurants, keyword: req.query.keyword, sortConditions, sort, sortOrder, sortName, sortOrderName })
    })
})

module.exports = router