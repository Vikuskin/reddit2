module.exports = (sequelize, Sequelize) => {
  const LikesCount = sequelize.define("likessum", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    likes: {
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
  return LikesCount;
} 
