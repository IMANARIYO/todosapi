const express = require("express");
const cors = require('cors');
require('dotenv').config(); 
const morgan = require("morgan");
const actions = require("./actions");
const mongoose = require('mongoose');


const app = express();
app.use(cors({

    origin: 'https://rpcimplementation.onrender.com',
    credentials: true,
}));
const PORT = 4445;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch(error => {
    console.error("Error connecting to MongoDB:", error);
});

// Set up middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"))

// Define routes
app.get("/", (req, res) => {
    res.send("It works!");
});

app.post("/rpc", async (req, res) => {
    try {
        const result = await actions[req.body.type](req.body.payload);
        res.send(result);
    } catch (error) {
        console.error(`Error processing ${req.body.type} request:`, error);
        res.status(500).send({ result: 'error', message: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on Port ${PORT}`);
});
