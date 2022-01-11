const express = require('express');
const router = express.Router();
//login-Handler:
router.get('/login',(req,res)=>{
    res.render('login');
})
router.get('/register',(req,res)=>{
    res.render('register');
})
//registeration-Handler:
router.post('/register',(req,res)=>{});
router.post('/register',(req,res)=>{});
//logOut-Handler:
router.get('/logout',(req,res)=>{});
module.exports = router;
