const express = require('express');

const app = express();

app.get('/', (req, res)=>{
	res.send("Welcome from your local server!");
});

app.listen(3000, () => {console.log("Server started listening on localhost:3000")});