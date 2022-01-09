const db = require("../models");
const config = require("../config/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { constructAddress } = require("./User/utils");

const User = db.user;
const Role = db.role;
const Address = db.address;

const Op = db.Sequelize.Op;

exports.register = (req, res) => {
  const { username, email, password, roles, address } = req.body;
  if (!username || !email || !password || !address) {
    res.status(400).send({ message: "Invalid Input values" });
  }

  User.create({
    username,
    email,
    password: bcrypt.hashSync(password, 8),
    address: constructAddress(address)
  }, {
    include: [Address]
  })
    .then(user => {
      if (roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.status(201).send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.status(201).send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.login = (req, res) => {

  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send({ message: "Login credentials not found" });
  }

  User.findOne({
    where: {
      username: username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
