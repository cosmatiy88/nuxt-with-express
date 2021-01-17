const config = require('../config')
const User = require('../models/User')
const validator = require('express-validator')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')


// Register
module.exports.register = [
  // validations rules
  validator.body('login', 'Введите логин').isLength({ min: 1 }),
  validator.body('login').custom(value => {
    return User.findOne({login:value}).then(user => {
      if (user !== null) {
        return Promise.reject('Пользователь с таким логином уже есть');
      }
    })
  }),
  validator.body('password', 'Введите пароль').isLength({ min: 1 }),

  function(req, res) {
    // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    // initialize record
    var user = new User({
        fio : req.body.fio,
        login : req.body.login,
        password : req.body.password,
    })

    // encrypt password
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password, salt);
    user.password = hash

    // save record
    user.save(function(err, user){
        if(err) {
            return res.status(500).json({
                message: 'Error saving record',
                error: err
            });
        }
        return res.json({
            message: 'saved',
            _id: user._id
        });
    })
  }
]


// Login
module.exports.login = [
  // validation rules
  validator.body('login', 'Введите логин').isLength({ min: 1 }),
  validator.body('password', 'Введите пароль').isLength({ min: 1 }),

  function(req, res) {
    // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    // validate email and password are correct
    User.findOne({login: req.body.login}, function(err, user){
        if(err) {
            return res.status(500).json({
                message: 'Error logging in',
                error: err
            });
        }

        if (user === null) {
          return res.status(500).json({
            message: 'Пользователь не найден.'
          });
        }

        // compare submitted password with password inside db
        return bcrypt.compare(req.body.password, user.password, function(err, isMatched) {
          if(isMatched===true){
            return res.json({
              user: {
                _id: user._id,
                login: user.login,
                fio: user.fio
              },
              token: jwt.sign({_id: user._id, login: user.login, fio: user.fio}, config.authSecret) // generate JWT token here
            });
          }
          else{
            return res.status(500).json({
              message: 'Неверный пароль'
            });
          }
        });
    });
  }
]

// Get User
module.exports.user = function(req, res) {
  var token = req.headers.authorization
  if (token) {
    // verifies secret and checks if the token is expired
    jwt.verify(token.replace(/^Bearer\s/, ''), config.authSecret, function(err, decoded) {
      if (err) {
        return res.status(401).json({message: 'unauthorized'})
      } else {
        return res.json({ user: decoded })
      }
    });
  }
  else{
    return res.status(401).json({message: 'unauthorized'})
  }
}



