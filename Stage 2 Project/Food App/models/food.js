module.exports = (sequelize, Sequelize) => {
  const Food = sequelize.define("foods", {
    foodName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    foodCost: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    foodType: {
      type: Sequelize.ENUM("Indian", "Chinese", "Mexican"),
      defaultValue: "Indian"
    }
  });

  return Food;
};