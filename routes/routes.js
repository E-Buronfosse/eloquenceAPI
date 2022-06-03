const express = require('express')
const userCtrl = require('../controllers/userCtrl')

exports.router = function () {
  const apiRouter = express.Router()

  apiRouter.route('users/signup').get(userCtrl.register)
  return apiRouter
}
