const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app= express()
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')
//setting path foe express config
const publicdirname=path.join(__dirname,'../public')
const viewspath= path.join(__dirname,"../templates/views")
const partialspath= path.join(__dirname,"../templates/partials")

// set up handlebars and views
app.set('view engine', 'hbs')
app.set('views', viewspath)
app.use(express.static(publicdirname))
hbs.registerPartials(partialspath)
// set up static directory to serve
app.get('',(req, res)=>{
    res.render('index',{
        title:'weather app',
        name:'Yuvraj'
    })
})
//app.com/
app.get('/about',(req, res)=>{
    res.render('about',{
        title:'It is about section',
        name :'Yuvraj'
    })
})
app.get('/help',(req, res)=>{
    res.render('help',{
        title:'HELP',
        name :'Yuvraj'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"please provide address for weather forecast"
        })
    }
    geocode(req.query.address,(error,{ location, latitude,longitude}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send(error)
            }
            res.send(
               {forecast: forecastdata,
                location
            })
        })
    })

})
app.get('/help/*', (req, res)=>{
    res.render('404help',{
        title: "404 help",
        name:'uv',
        errormessage:"help article not found"
    })
  })
  app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"it is required to provide search terms"
        })
    }
        res.send({
            products:[],
        })
  
  })
app.get('*', (req, res)=>{
  res.render('404',{
    title:404,
    name:"yUvi",
    errormessage:"page not found"
  })
})
app.listen(3000,()=>{
    console.log("server is up on port 3000")
})
