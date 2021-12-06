module.exports = (sequelize, Sequelize) => {
  const Likes = sequelize.define("likes", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    like: {
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
  return Likes;
} 
