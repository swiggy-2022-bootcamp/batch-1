const db = require("../../models");
const { getPagination, getPagingData } = require('../utils')
const Address = db.address;
const User = db.user;

exports.getAllUsers = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  User.findAndCountAll({
    limit,
    offset,
    include: [{
      model: Address,
      required: true
    }]
  })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error fetching Users list."
      });
    });
};

exports.getUser = (req, res) => {
  const { id } = req.params;

  User.findOne({
    where: { id },
    include: [{
      model: Address
    }]
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    })
    .catch(_err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;

  User.update(req.body, {
    where: { id: id },
    include: [{
      model: Address
    }]
  })
    .then(status => {
      if (status == 1) {
        res.status(200).send({
          message: "User is updated successfully."
        });
      } else {
        res.status(400).send({
          message: `Cannot update User with id=${id}. Maybe User was not found or payload is empty!`
        });
      }
    })
    .catch(_err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
}

exports.deleteUser = (req, res) => {
  const { id } = req.params;

  User.destroy({
    where: { id: id }
  })
    .then(status => {
      if (status == 1) {
        res.status(200).send({
          message: "User was deleted successfully!"
        });
      } else {
        res.status(400).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(_err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};