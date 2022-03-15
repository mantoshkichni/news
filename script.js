const express=require('express');
const app=express();
const fetch=require('node-fetch')
const ejs=require('ejs');
require('dotenv').config();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set('views','views')
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    news((error,response)=>{
    if(error)
     {
        res.render('error.ejs');
         console.log(error)}
    else res.render('home.ejs',{response})
   })
   
        
})


app.post('/getnews',(req,res)=>{
    const location=req.body.country;
    const category=req.body.category;
    getnews(location,category,(error,response)=>{
        if(error)
         {
            res.render('error.ejs');
             console.log(error)}
        else res.render('home.ejs',{response})
       })
    
})

async function news(callback)
{
    try {
        const res=await fetch('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey='+process.env.APIKEY)
        const data=await res.json();
        callback(undefined,data)
    } catch (error) {
        callback(error);
    }
    
}
async function getnews(location,category,callback)
{
    try {
        
        const res=await fetch('https://newsapi.org/v2/top-headlines?country='+encodeURIComponent(location)+'&category='+encodeURIComponent(category)+'&apiKey='+process.env.APIKEY)
        const data=await res.json();
        callback(undefined,data)
    } catch (error) {
        callback(error);
    }
    
}


app.listen('3000',()=>{console.log('Server is up and running')});
