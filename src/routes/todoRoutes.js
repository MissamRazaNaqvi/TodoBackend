const express = require('express');
const routes = express.Router();
const { addData, deleteRecord, updateRecord, register, login, verifyUser, getUserData, getData } = require('../controller/getData.controller')

routes.get('/', getData)
routes.post('/', addData)
routes.delete('/:id', deleteRecord)
routes.post('/update', updateRecord)
routes.post('/register', register)
routes.post('/login', login)
routes.post('/verify', verifyUser)
routes.post('/getUserData', getUserData)
module.exports = routes