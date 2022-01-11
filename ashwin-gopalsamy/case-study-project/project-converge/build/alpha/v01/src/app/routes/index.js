const express = require ('express');
const router = express.Router();
//welcomePage
router.get('/',(req,res)=>{
    res.render('welcome');
})
//loginPage
router.get('/login',(req,res)=>{
    res.render('login');
});
//registerationPage
router.get('/register',(req,res)=>{
    res.render('register');
});

module.exports = router;