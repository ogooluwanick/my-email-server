import express from "express";
import bodyParser from "body-parser"
import dotenv from "dotenv"
import cors from "cors"

import ogo_portfolioRouter from "./routers/ogo_portfolioRouter.js";

const app = express()

dotenv.config();

app.use( (req,res,next)=>{
        console.log(`${req.method} ${req.path} - ${req.ip}`)
        next();
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({
        origin: '*', // Replace with your frontend domain
        methods: ['GET', 'POST'],
        credentials: true, // If your frontend uses cookies or credentials
        optionsSuccessStatus: 204,
        allowedHeaders: '*',
})); 


app.get('/', (req, res) => {
        console.log('Server is ready')
        res.send('Server is ready')
})

app.use('/api/ogo_portfolio', ogo_portfolioRouter)


const port= process.env.PORT || 5005;

app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`)
})
