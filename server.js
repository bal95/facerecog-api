const express=require('express')
const bcrypt = require('bcrypt')
const cors=require('cors')
const register=require('./controllers/register')
const signin=require('./controllers/signin')
const profile=require('./controllers/profile')
const image=require('./controllers/image')
const knex=require('knex')({
    client: 'pg',
    connection:{
        connectionString: process.env.DATABASE_URL,
        ssl:{
            rejectUnauthorized:false
        }
    }
})

knex.select('*').from('users').then(data=>console.log(data))

const app=express()

//app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send('success')
})

app.post('/signin',(req,res)=>signin.handleSignin(req,res,knex,bcrypt))
app.post('/register',(req,res)=>register.handleRegister(req,res,knex,bcrypt))
app.get('/profile/:id',(req,res)=>profile.handleProfile(req,res,knex))
app.put('/image',(req,res)=>image.handleImage(req,res,knex))
app.listen(process.env.PORT || 3000,()=>{
    console.log(`listening on port ${process.env.PORT}`)
})