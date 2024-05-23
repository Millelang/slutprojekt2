const express = require('express')
const router = express.Router()

const { body, matchedData, validationResult, validator } = require('express-validator')
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

    console.log(req.session.username)
    if (result) {
      req.session.username = username
      req.session.login = true
      res.redirect('/')
      console.log(req.session.login)
    } else {
      let fel = true
      res.render('login.njk', {
        fel: fel
      })
      console.log(fel)

    }
  });
})



router.get('/signup', (req, res) => {
  res.render('signup.njk')

})

router.post('/signup',
  [body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('password').trim().isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')],

  async function (req, res) {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const username = req.body.username
    const password = req.body.password


      const [user] = await pool.promise().query(
        'SELECT id, password FROM milton_users WHERE name = ?', [username]
      )

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
  let cart = req.body
  res.json("hej")
  cart.forEach(item => {
    try {
      const [order] = pool.promise().query('INSERT INTO `milton_orders` ( `user_id`, `antal`, `produkter`, `pris` ) VALUES( ?, ?, ?, ?)', [req.session.userid, item.quantity, item.name, item.price])
      res.redirect('/confirmation')
    } catch (error) {
      console.log(error)
    }
  })
});
// try {
//   const [order] = await pool.promise().query('INSERT INTO `milton_orders` ( `user_id`, `pris`, `produkter` ) VALUES( ?, ?, ?)', [user, pris, products])
//   res.redirect('/')
// } catch (error) {
//   console.log(error)
// }

router.get('/cart', (req, res) => {

  res.render('cart.njk')
})

router.get('/products', async function (req, res) {


  let query = req.query.searchQueryInput
  if (query) {
    query = query.replace(/[^a-zA-Z0-9]/g, '')
    try {
      const [produkt] = await pool.promise().query(`
      SELECT * FROM milton_produkter WHERE name LIKE "%${query}%" `)
      res.render('products.njk', { products: produkt })
      console.log(produkt)
    }
    catch (error) {
      console.log(error)
      res.sendStatus(500)
    }
  } else {
    res.send('No query provided')
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

router.get('/confirmation', (req, res) => {
  res.render('confirmation.njk')
})

module.exports = router