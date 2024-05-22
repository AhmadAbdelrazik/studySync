const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const coursesRoute = require('./Routes/courses');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/courses', coursesRoute);

app.listen(port, () => {
  console.log(`Started listening at port ${port} ...!!`);
})