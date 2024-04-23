const express = require('express')
const router = express.Router()
const { body, matchedData, validationResult } = require('express-validator')
const bcrypt = require('bcrypt');
const pool = require('../db.js')



router.get('/', async function (req, res) {
  console.log("index user ", req.session.username)

  const [products] = await pool.promise().query('SELECT * FROM milton_produkter')
  res.render('index.njk', {
    produkter: products,
    username: req.session.username,
  })
})

router.get('/login', (req, res) => {
  res.render('login.njk'), {
    username: req.session.username
  }
})

router.post('/login', async function (req, res) {

  const username = req.body.username

  const [user] = await pool.promise().query(
    'SELECT id, password FROM milton_users WHERE name = ?', [username]
  )


  req.session.userid = user[0].id
  const passwordenter = req.body.password

  bcrypt.compare(passwordenter, user[0].password, function (err, result) {
    req.session.username = username
    console.log(req.session.username)
    if (result) {
      req.session.login = true
      res.redirect('/')
      console.log(req.session.login)
    } else {
      res.json({ message: 'Fel lösenord' })
    }
  });
})



router.get('/signup', (req, res) => {
  res.render('signup.njk')

})

router.post('/signup', async function (req, res) {
  const username = req.body.username
  const password = req.body.password

  bcrypt.hash(password, 10, async function (err, hash) {
    try {
      const [user] = await pool.promise().query('INSERT INTO `milton_users` ( `name`, `password`) VALUES( ?, ?)', [username, hash])
      res.redirect('/login')
    } catch (error) {
      console.log(error)
      res.status(402)
    }
  })



})

router.post('/order', async function (req, res) {
  console.log(req.body)
  res.json("hej"  )
  // const [products] = localStorage.getItem('key')
  // const [price] = localStorage.getItem('value')
  // const user = req.session.id
  // let pris = 0
  // for (let i = 0; i < price.length; i++) {
  //   pris += price[i]
  // }
  // try {
  //   const [order] = await pool.promise().query('INSERT INTO `milton_orders` ( `user_id`, `pris`, `produkter` ) VALUES( ?, ?, ?)', [user, pris, products])
  //   res.redirect('/')
  // } catch (error) {
  //   console.log(error)
  // }
})

router.get('/cart', (req, res) => {
  res.render('cart.njk')
})

module.exports = router