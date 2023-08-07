const express = require ("express")
const app = express()
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require ("cors")

dotenv.config();

app.use( (req,res,next)=>{
        console.log(`${req.method} ${req.path} - ${req.ip}`)
        next();
});

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))       //increase data limit for file64 data convert
app.use(express.json());
app.use(express.urlencoded({extended:true }));
app.use(
    cors({
        origin:"*",
        methods: ['GET', 'POST'],
        credentials:true,                                                                                       //access-control-allow-credentials:true
        optionSuccessStatus:200,
    })
)
      


app.get('/', (req,res)=>{
        res.send('Server is ready')
})


app.get("/api/clearchats", async(req,res)=> {
       console.log("test works")
})




const port= process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`)
})
