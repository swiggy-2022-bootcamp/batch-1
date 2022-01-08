const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express();
app.use('/', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());

PORT = process.env.port || 4000;

app.get('/', (req, res) => {
    res.send('Hello');
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
