const cors = require("cors");
const express = require("express");
const app = express();
const port = 3000;

// Middelware
app.use(cors());

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// console.log('hi everybody')
