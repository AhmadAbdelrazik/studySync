const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

const connectDB = async (db) => { try {
  await mongoose.connect(`mongodb://127.0.0.1:27017/${db}`)
  console.log("Connected to database");
} catch (err) {
  console.log(err);
}
}

connectDB(`studySync`)

const coursesRoute = require('./Routes/courses');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/courses', coursesRoute);

app.listen(port, () => {
  console.log(`Started listening at port ${port} ...!!`);
})