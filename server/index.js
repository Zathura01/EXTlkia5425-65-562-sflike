const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

const MongoURI = "mongodb://localhost:27017/domainDB";
mongoose.connect(process.env.MONGO_URI_DMNEXT);

 const checkDomainRouter = require('./route/Search');
app.use('/check-domain', checkDomainRouter); 

const Port = 3000;
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
