module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    groups: {
      type: Sequelize.STRING,
      allowNull: false
    },
    tags: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false
    },
    mark: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    imagesFolder: {
      type: Sequelize.STRING,
      defaultValue: 'no img'
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false
  }, {
    indexes: [
      {
        type: 'FULLTEXT',
        name: 'ft',
        fields: ['tags', 'content']
      }
    ]
  });
  return Post;
} 
