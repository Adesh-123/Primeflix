const express= require('express');
const app =express();
const dotenv=require('dotenv');
const mongoose= require('mongoose');
var cors = require('cors')

dotenv.config();
const PORT = 8000;
mongoose.connect(
    process.env.MONGODB_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    ).then(console.log("DATABASE IS RUNNING SUSSCESSFULLY"))
    .catch((err)=> console.log(err));

app.use(cors())  
app.use(express.json());
app.use('/api/auth',require("./routes/auth"))
app.use('/api/user',require("./routes/user"))
app.use('/api/movies',require("./routes/movie"))
app.use('/api/lists',require("./routes/list"))


app.listen(PORT,()=>{
    console.log("BACKEND IS RUNNING SUCESSFULLY");
})
