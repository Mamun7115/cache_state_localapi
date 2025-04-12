import dotenv from "dotenv";
import express from "express";
import fs from "fs";

// Import environment variables
dotenv.config();

const app = express();

// check environment variable SERVER_PORT exist or has any value
if (!process.env.SERVER_PORT || process.env.SERVER_PORT === null || process.env.SERVER_PORT === undefined) {
    console.error("SERVER_PORT is not defined!");
    process.exit(1);
}


const pretendData = [
    {
        name: "Huhhshsman",
        age: 29,
        gender: "male"
    }
]


if (!fs.existsSync("./data.json")) {
    fs.writeFileSync("./data.json", JSON.stringify(pretendData))
}


app.use(express.json())






// routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.put("/data", (req, res) => {
    const { name, age, gender } = req.body;

    let data = [];
    try {
        // Check if file exists and read it
        if (fs.existsSync("./data.json")) {
            const fileContent = fs.readFileSync("./data.json", "utf8");
            data = fileContent ? JSON.parse(fileContent) : [];
        }
    } catch (err) {
        return res.status(500).json({ error: "Failed to read data file" });
    }

    const newData = [...data, { name, age, gender }];

    try {
        fs.writeFileSync("./data.json", JSON.stringify(newData, null, 2));
        res.status(200).json(newData);
    } catch (err) {
        res.status(500).json({ error: "Failed to write data file" });
    }
});

// Start the server and listen on the specified port
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Example app listening on port ${process.env.SERVER_PORT}`);
});
