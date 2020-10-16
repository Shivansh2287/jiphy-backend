//IMPORTS
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGOURI } = require("./config/keys");


//mongo connection
mongoose.connect(
  MONGOURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("connected to DB");
  }
);


//routes and model 
// require('cors')
// app.use(cors())
app.use(express.json());
require("./models/user");
require("./models/post");
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));

if(process.env.NODE_ENV=="production"){
  app.use(express.static('frontend/build'))
  const path = require('path')
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
  })
}

const PORT = process.env.PORT||5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
