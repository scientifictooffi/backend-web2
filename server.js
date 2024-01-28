const express = require("express")
const axios = require("axios")
const app = express()
app.use(express.static(__dirname+'/test12'));

const port = 3000
app.get(`/`,(req,res)=>{
    res.sendFile(__dirname+`/home.html`)
})
app.get(`/weatherPage`, (req,res)=>{
    res.sendFile(__dirname+`/weather.html`)
})
app.get('/newsPage',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})
app.get(`/news`, async (req, res) => {
    try {
        const apiKeyNews = 'eefa78a34c034fc38fe31f8e92c542cc';
        const info = req.query.info;
        console.log(info);

        const response = await axios.get(`https://newsapi.org/v2/everything?q=${info}&apiKey=${apiKeyNews}`);

        // Extract information from individual articles
        const articlesData = response.data.articles.map(article => ({
            author: article.author,
            title: article.title,
            description: article.description,
            content: article.content,
            url:article.url
        }));

        res.json(articlesData);
    } catch (error) {
        console.log('Error', error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/weather',async (req,res)=>{
    try{
        const apiKey='6f4071cea07c469996982606241901'
        const city = req.query.city||"Rudny"
        const response  =await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
        const weatherData={
            location:response.data.location.name,
            temperature:response.data.current.temp_c,
            condition:response.data.current.condition.text,
        }
        res.json(weatherData);
    }   
    catch(error){
        console.log('Error',error.message)
        res.status(500).json({error:"Internal ser   ver error"})
    }
}).listen(port,()=>{
    console.log("Server is running")
})
