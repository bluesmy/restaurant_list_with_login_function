const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
const sortConditions = require('../public/javascripts/sortConditions')
const { authenticated } = require('../config/auth')

// 排序 Restaurant
router.get('/:sortCondition/:sortName/:sortOrder/:sortOrderName', authenticated, (req, res) => {
  if (req.params.sortOrder === '1') {
    if (req.params.sortCondition === 'name') {
      Restaurant.find({ userId: req.user._id })
        .sort({ name: 1 })
        .exec((err, restaurants) => {
          if (err) return console.error(err)
          return res.render('index', { restaurants, sortConditions, sortCondition: req.params.sortCondition, sortName: req.params.sortName, sortOrder: req.params.sortOrder, sortOrderName: req.params.sortOrderName })
        })
    }

    else if (req.params.sortCondition === 'category') {
      Restaurant.find({ userId: req.user._id })
        .sort({ category: 1 })
        .exec((err, restaurants) => {
          if (err) return console.error(err)
          return res.render('index', { restaurants, sortConditions, sortCondition: req.params.sortCondition, sortName: req.params.sortName, sortOrder: req.params.sortOrder, sortOrderName: req.params.sortOrderName })
        })
    }

    else if (req.params.sortCondition === 'location') {
      Restaurant.find({ userId: req.user._id })
        .sort({ location: 1 })
        .exec((err, restaurants) => {
          if (err) return console.error(err)
          return res.render('index', { restaurants, sortConditions, sortCondition: req.params.sortCondition, sortName: req.params.sortName, sortOrder: req.params.sortOrder, sortOrderName: req.params.sortOrderName })
        })
    }

    else if (req.params.sortCondition === 'rating') {
      Restaurant.find({ userId: req.user._id })
        .sort({ rating: 1 })
        .exec((err, restaurants) => {
          if (err) return console.error(err)
          return res.render('index', { restaurants, sortConditions, sortCondition: req.params.sortCondition, sortName: req.params.sortName, sortOrder: req.params.sortOrder, sortOrderName: req.params.sortOrderName })
        })
    }
  }

  else if (req.params.sortOrder === '-1') {
    if (req.params.sortCondition === 'name') {
      Restaurant.find({ userId: req.user._id })
        .sort({ name: -1 })
        .exec((err, restaurants) => {
          if (err) return console.error(err)
          return res.render('index', { restaurants, sortConditions, sortCondition: req.params.sortCondition, sortName: req.params.sortName, sortOrder: req.params.sortOrder, sortOrderName: req.params.sortOrderName })
        })
    }

    else if (req.params.sortCondition === 'category') {
      Restaurant.find({ userId: req.user._id })
        .sort({ category: -1 })
        .exec((err, restaurants) => {
          if (err) return console.error(err)
          return res.render('index', { restaurants, sortConditions, sortCondition: req.params.sortCondition, sortName: req.params.sortName, sortOrder: req.params.sortOrder, sortOrderName: req.params.sortOrderName })
        })
    }

    else if (req.params.sortCondition === 'location') {
      Restaurant.find({ userId: req.user._id })
        .sort({ location: -1 })
        .exec((err, restaurants) => {
          if (err) return console.error(err)
          return res.render('index', { restaurants, sortConditions, sortCondition: req.params.sortCondition, sortName: req.params.sortName, sortOrder: req.params.sortOrder, sortOrderName: req.params.sortOrderName })
        })
    }

    else if (req.params.sortCondition === 'rating') {
      Restaurant.find({ userId: req.user._id })
        .sort({ rating: -1 })
        .exec((err, restaurants) => {
          if (err) return console.error(err)
          return res.render('index', { restaurants, sortConditions, sortCondition: req.params.sortCondition, sortName: req.params.sortName, sortOrder: req.params.sortOrder, sortOrderName: req.params.sortOrderName })
        })
    }
  }


})


module.exports = router