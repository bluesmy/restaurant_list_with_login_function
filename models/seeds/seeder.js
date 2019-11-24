const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const User = require('../user')
const bcrypt = require('bcryptjs')

const { users: userList } = require('../../user.json')
const { results: restaurantList } = require('../../restaurant.json')

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db error!')
})

db.once('open', () => {
  console.log('db connected!')

  userList.forEach((user, index) => {

    const newUser = new User({
      name: user.name,
      email: user.email,
      password: user.password
    })

    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err
        newUser.password = hash

        newUser
          .save()
          .then(user => {
            const restaurants = restaurantList.slice(index * 3, index * 3 + 3)
            restaurants.forEach(restaurant => {
              Restaurant.create(
                {
                  name: restaurant.name,
                  name_en: restaurant.name_en,
                  category: restaurant.category,
                  image: restaurant.image,
                  location: restaurant.location,
                  phone: restaurant.phone,
                  google_map: restaurant.google_map,
                  rating: restaurant.rating,
                  description: restaurant.description,
                  userId: user._id
                })
            })
          })
          .catch(err => console.log(err))

      })
    )
  })

  console.log('done')

})