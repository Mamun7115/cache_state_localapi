import dotenv from "dotenv";
import express from "express";

// Import environment variables
dotenv.config();

const app = express();

// check environment variable SERVER_PORT exist or has any value
if (!process.env.SERVER_PORT || process.env.SERVER_PORT === null || process.env.SERVER_PORT === undefined) {
    console.error("SERVER_PORT is not defined!");
    process.exit(1);
}


// routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Start the server and listen on the specified port
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Example app listening on port ${process.env.SERVER_PORT}`);
});
