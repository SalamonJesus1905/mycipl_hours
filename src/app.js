import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/v1/index.js';
import errorHandler from './validations/globalErrorHandling.js';


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/v1',routes)
app.use(errorHandler)

export default app;