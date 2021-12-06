module.exports = (sequelize, Sequelize) => {
  const Rating = sequelize.define("rating", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    stars: {
      type: Sequelize.FLOAT,
      defaultValue: 0
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    post_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false
  });
  return Rating;
} 
