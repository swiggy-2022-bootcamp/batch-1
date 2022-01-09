const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "admin"
  });
}

//default route
app.get("/", (_req, res) => {
  res.json({ message: "Welcome to Food Delivery application." });
});

require('./routes/auth')(app)
require('./routes/user')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});