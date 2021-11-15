const express = require('express');
const router = express.Router();
const controller = require('../controllers/userControllers');

const { listAllUsers, getUser, userSignup, userLogin, postExam } = controller;

router.get('/list', listAllUsers);
router.get('/user/:name', getUser);
router.post('/signup', userSignup);
router.post('/login', userLogin);
router.post('/postexam', postExam);

module.exports = router;
