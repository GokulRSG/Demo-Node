import express from "express";
import { MongoClient } from "mongodb";

const port= 5000;
const app = express();
// middleware
app.use(express.json())
// db route path url 

const mongoDB_URL="mongodb://127.0.0.1:27017";
// db connection 
async function DbConnection(){
const client = new MongoClient(mongoDB_URL);
console.log("Enter");
await client.connect();
console.log("mongo db is connected successfully");
return client;
}
const clientDb = await DbConnection();
// console.log(clientDb,"client");




async function CreateUser(req, res){
    const newData = req.body;
    const name = req.body.name;
    //console.log(name,"name ---------------");
    const findName  = await clientDb.db("student-node").collection("student").findOne({name : name})
    //console.log(findName);
    console.log(findName,"findname");
    if(!findName){
        res.send("Success")
    }
    else{
        res.send("something went wrong")
    }
    //const result = await clientDb.db("student-node").collection("student").insertMany(newData);
    //res.send(result);
}

// insert stud data
app.use('/students',CreateUser)

// console.log(newData,"newData");
// const result = await clientDb.db("student-node").collection("student").insertMany(newData);
// console.log(result,"result");
// res.send(result);
//})


app.use('/all', async (req, res)=>{
    //console.log("Call Function-----------------------------------");
    const result = await clientDb.db("student-node").collection("student").find({}).toArray();
    console.log(result);

})

    

//get db from fetch data
// student-node=> dbs students => collection
// use client side la irunthu vara request ya server side send panum pothu req.body la data varum 
// app.use => all request handle pannum and app.get get http request 
app.get('/',(req,res)=>{
res.send("express world");
})

app.listen(port,()=>console.log("listening port",port));