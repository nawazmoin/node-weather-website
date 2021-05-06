const express=require("express");
const path=require("path");
const hbs=require("hbs");
const forecast=require('./utils/forecast');
const geocode=require('./utils/geocode');
// console.log(__dirname);
// console.log(__filename);
console.log();

const app=express();
const port=process.env.PORT || 3000;

//define path for express configration
const publicDirectory=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials');

//setting up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//set up static directory to serve
app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:"andrew Head"
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Me",
        name:"Moin Nawaz"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        name:'Andrew Heaad',
        message:"This is a dynamic help message"
    })
})
app.get('/weather',(req,res)=>{
    // console.log(req.query.address);
    if(!req.query.address){
        return res.send({
            error:"You must provide a Address"
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
            res.send({
                error:error
            });
        }
        forecast(data.latitude,data.longitude,(error,forecast)=>{
            // console.log("lat",data.latitude);
            // console.log("lon",data.longitude);
            if(error){
                return console.log(error);
            }
            // console.log(data);
            res.send({
                forecast:forecast,
                location:data.location,
                address:req.query.address
            });
        })
    })
    
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You Must provide a search term'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        message:"Help Article not found"
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        title:"404",
        message:"Page not found"
    })
})

app.listen(port,()=>{
    console.log("Server is up on port "+ port);
});
