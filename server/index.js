const express= require ("express")
const session= require("express-session")
const massive= require ('massive')
const authCtrl= require('./controllers/authController')
require ('dotenv').config();


const app= express();
const PORT= 4000

const {CONNECTION_STRING, SESSION_SECRET}= process.env

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then (db=>{
    app.set('db', db)
    console.log('db connected');
});

app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
}))



app.use(express.json())

app.listen(PORT, ()=>console.log(`listening on port ${PORT}`))

app.post('/auth/register', authCtrl.register)