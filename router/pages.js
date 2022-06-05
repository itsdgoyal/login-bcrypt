const router = require('express').Router()
const signup = require('../models/signupform')
const bcrypt = require('bcrypt')




const auth = (req,res,next)=>{
    if(req.session.isAuth){
        next()
    }else{
        res.redirect('/login')
    }
}




//Signup
router.get('/',(req,res)=>{
    res.render('signupform.ejs')
})
router.post('/',async(req,res)=>{
    const cemail = req.body.cemail
    const cusername = req.body.cusername
    const cpassword = await bcrypt.hash(req.body.cpassword,10)
    //const cpassword = req.body.cpassword
    const data = new signup({cemail:cemail,cusername:cusername,cpassword:cpassword})
    console.log(data)
    await data.save()
    //res.send('Account Created !!')
    res.redirect('/')
})


//Database
router.get('/database',async(req,res)=>{
    const data = await signup.find()
    res.render('database.ejs',{data:data})
})

router.get('/database/:id',async(req,res)=>{
    const id = req.params.id
    //console.log(id)
    await signup.findByIdAndDelete(id)
    res.redirect('/database')  
})

//login
router.get('/login',(req,res)=>{
    res.render('loginform.ejs')
})
router.post('/login',async(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const data = await signup.findOne({cusername:username})
    console.log(data)
    if(data != null){
        const passwordcheck = await bcrypt.compare(password,data.cpassword)
        if(passwordcheck){
        //if(data.cpassword == password){
            req.session.isAuth = true
            res.render('hello.ejs')
        }else{
            res.send('invalid username or password')
        }
    }else{
        res.send('invalid username or password')
    }
})

//logout
router.post('/logout',(req,res)=>{
    req.session.destroy()
    res.redirect('/login')
})
module.exports = router