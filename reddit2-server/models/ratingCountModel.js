module.exports = (sequelize, Sequelize) => {
  const RatingCount = sequelize.define("ratingsum", {
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
    post_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false
  });
  return RatingCount;
} 
