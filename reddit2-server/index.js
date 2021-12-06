const express = require('express');
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const app = express();
const authRoute = require('./routes/auth');
const profilePostRoute = require('./routes/profilePost');
const mainPostRoute = require('./routes/mainPost');
const adminRoute = require('./routes/adminRoute');
const searchRoute = require('./routes/searchPost')

app.use(
  cors({
    origin: 'https://reddit2-client.herokuapp.com',
    credentials: true
  })
)


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use("/auth", authRoute);
app.use('/profile', profilePostRoute);
app.use('/', mainPostRoute);
app.use('/admin', adminRoute);
app.use('/search', searchRoute);

app.listen(PORT, () => console.log('server start'));