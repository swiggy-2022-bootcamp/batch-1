const { FOOD_TYPES, validateFood } = require('../Food/utils')
const { getPagination, getPagingData } = require('../utils')
const db = require("../../models");
const Food = db.food;


exports.getAllFoods = (req, res) => {

  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Food.findAndCountAll({ limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error fetching Foods list."
      });
    });
};

exports.getFood = (req, res) => {
  const { id } = req.params;

  Food.findOne({
    where: { id }
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Food with id=${id}.`
        });
      }
    })
    .catch(_err => {
      res.status(500).send({
        message: "Error retrieving Food with id=" + id
      });
    });
};

exports.addBulkFood = (req, res) => {
  const foodsFromUser = req.body?.foods;

  if (!foodsFromUser || !Array.isArray(foodsFromUser)) {
    res.status(400).send({ message: "Invalid Input values" });
    return;
  }

  const foods = validateFood(foodsFromUser);

  Food.bulkCreate(foods, { validate: true }).then(() => {
    res.status(201).send({ message: "Foods are added successfully!" });
  }).catch((err) => {
    res.status(500).send({ message: err.message });
  })
}

exports.addFood = (req, res) => {
  const { foodName, foodCost, foodType } = req.body;

  if (!foodName || !foodCost || !foodType) {
    res.status(400).send({ message: "Invalid Input values" });
    return;
  }

  if (!FOOD_TYPES.includes(foodType)) {
    res.status(400).send({ message: "Invalid FoodType" });
    return;
  }

  Food.findOne({
    where: {
      foodName
    }
  }).then(food => {
    if (food) {
      res.status(400).send({
        message: "Failed! Food is already added!"
      });
    } else {
      Food.create({
        foodName,
        foodCost,
        foodType
      })
        .then(() => {
          res.status(201).send({ message: "Food is added successfully!" });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
    }
  });
}

exports.updateFood = (req, res) => {
  const { id } = req.params;

  Food.update(req.body, {
    where: { id: id }
  })
    .then(status => {
      if (status == 1) {
        res.status(200).send({
          message: "Food is updated successfully."
        });
      } else {
        res.status(400).send({
          message: `Cannot update Food with id=${id}. Maybe Food was not found or payload is empty!`
        });
      }
    })
    .catch(_err => {
      res.status(500).send({
        message: "Error updating Food with id=" + id
      });
    });
}

exports.deleteFood = (req, res) => {
  const { id } = req.params;

  Food.destroy({
    where: { id: id }
  })
    .then(status => {
      if (status == 1) {
        res.status(200).send({
          message: "Food was deleted successfully!"
        });
      } else {
        res.status(400).send({
          message: `Cannot delete Food with id=${id}. Maybe Food was not found!`
        });
      }
    })
    .catch(_err => {
      res.status(500).send({
        message: "Could not delete Food with id=" + id
      });
    });
};