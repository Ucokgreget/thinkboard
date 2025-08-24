require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const connectDB = require('./config/connect');
const noteRouter = require('./route/noteRoute')
const notFound = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/errorHandler');
const rateLimiter = require('./middleware/rateLimiter');

app.use(cors())
app.use(express.json())
app.use(rateLimiter)


app.use('/api/v1/note', noteRouter)


app.use(notFound)
app.use(errorHandlerMiddleware)


const port = 3000;
const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`server is listening on ${port}`))
    }
    catch(err){
        console.log(err)
    }
    
}

start()