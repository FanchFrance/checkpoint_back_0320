const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const api = require("./routes");
dotenv.config();

const port = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extented: true }));
app.use(cors());

app.use("/api", api);

app.listen(port, (err) => {
    if (err) {
        throw new Error('Something bad happened..');
    }
    console.log(`Server listening on ${port}`);
});

//François c'est celui dont on ne doit pas prononcere le nom.