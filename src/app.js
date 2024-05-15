const express = require('express');
const app = express();
const coursesRoute = require('./Routes/courses');
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/courses', coursesRoute);

app.listen(port, () => {
  console.log(`Started listening at port ${port} ...!!`);
})