import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';    

const app = express();



const port = 5000;

app.get('/', (req, res) => {
    res.send('hello world')
})
 
app.listen(port,()=> {
    console.log(`listening on port ${port}....`)
})
