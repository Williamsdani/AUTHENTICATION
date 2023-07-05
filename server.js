const mongoose =require ("mongoose")
const dotenv=require("dotenv")
dotenv.configDotenv({path:"./Config/config.env"})
const router = require("./Routers/userRouters")
const app = require("./app")
app.use("/api",router)
const DB=process.env.DATABASE





// const Db= "mongodb+srv://wd7576383:QJXyOHcMh9qyQcDV@cluster0.o7ctz1l.mongodb.net/"
mongoose.connect(DB).then(() => {
  console.log("connected to db");
})
  .catch((e) => {
    console.log(e.message);
  });




