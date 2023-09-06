require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const session=require('express-session')
const routes=require('./routes/routes')

const app=express()
const PORT=process.env.PORT || 3000


//database connection
// mongoose.connect(process.env.DB_URI);
// const db=mongoose.connection;
// db.on('error',(error)=>{
//     console.log(error)
// })
// db.once('open',()=>{
//     console.log("connected to database")
// })

mongoose.connect(process.env.DB_URI).then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

//middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(session({
    secret:"mysecret key",
    saveUninitialized:true,
    resave:false
}))

app.use((req,res,next)=>{
    res.locals.message=req.session.message;
    delete req.session.message
    next()
})

app.use(express.static('uploads'))

//set template engine
app.set('view engine','ejs')
// app.set('views',__dirname+"/views")


//route prefix
// app.use("",require("./routes/routes"))
app.use(routes)


app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})