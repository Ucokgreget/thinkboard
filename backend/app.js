require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/connect');
const noteRouter = require('./route/noteRoute');
const notFound = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/errorHandler');
const rateLimiter = require('./middleware/rateLimiter');
const path = require('path');

if(process.env.NODE_ENV !== "production"){
    app.use(cors());
}
app.use(express.json());
app.use(rateLimiter);

// API routes
app.use('/api/v1/note', noteRouter);

const dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(dirname, "../frontend/dist")));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(dirname, "../frontend/dist", "index.html"));
  });
}

app.use(notFound);
app.use(errorHandlerMiddleware);



const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
