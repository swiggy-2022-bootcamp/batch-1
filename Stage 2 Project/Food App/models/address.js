module.exports = (sequelize, Sequelize) => {
  const Address = sequelize.define("address", {
    houseno: {
      type: Sequelize.INTEGER
    },
    street: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING,
    },
    zip: {
      type: Sequelize.INTEGER,
    }
  });

  return Address;
};