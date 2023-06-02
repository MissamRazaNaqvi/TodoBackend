const express = require('express');
const routes = express.Router();
const { getData, addData, deleteRecord, updateRecord, register, login } = require('../controller/getData.controller')
// const getData = require('../controller/getData.controller')

routes.get('/', getData)
routes.post('/', addData)
routes.delete('/:id', deleteRecord)
routes.post('/update', updateRecord)
routes.post('/register', register)
routes.post('/login', login)
module.exports = routes