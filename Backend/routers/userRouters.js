const express = require('express');
const router = express.Router();
const controller = require('../controllers/userControllers');

const { listAllUsers, getUser, userSignup, userLogin, deleteUserById } =
   controller;

router.get('/list', listAllUsers);
router.get('/user', getUser);
router.post('/signup', userSignup);
router.post('/login', userLogin);
// router.delete('/delete/:id', deleteUserById);

module.exports = router;
