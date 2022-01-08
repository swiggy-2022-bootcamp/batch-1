const express = require('express');
const app = express();
const PORT = process.env.PORT || 2022;

app.get('/', (_, res) => {
    res.status(200).send("Working!");
})

app.listen(PORT, (err) => {
    if(err) {
        console.log("Error starting the application!");
    }

    console.log("Server is up and running at port: ", PORT);
});