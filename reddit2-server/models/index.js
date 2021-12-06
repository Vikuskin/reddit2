const Sequelize = require("sequelize");
const sequelize = new Sequelize("heroku_c023e8e6f57580e", "b0c6cfe038bfe9", "6ea56807", {
  dialect: "mysql",
  host: "us-cdbr-east-04.cleardb.com"
});
// mysql --host=us-cdbr-east-04.cleardb.com --user=b0c6cfe038bfe9 --password=6ea56807 --reconnect heroku_c023e8e6f57580e

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./userModel.js")(sequelize, Sequelize);
db.post = require('./postsModel.js')(sequelize, Sequelize);
db.rating = require('./ratingModel.js')(sequelize, Sequelize);
db.ratingCount = require('./ratingCountModel.js')(sequelize, Sequelize);
db.likes = require('./likesModel.js')(sequelize, Sequelize);
db.likesCount = require('./likesCountModel.js')(sequelize, Sequelize);

db.post.belongsTo(db.ratingCount, { foreignKey: 'id', targetKey: 'post_id' });
db.post.belongsTo(db.likesCount, { foreignKey: 'id', targetKey: 'post_id' })

db.sequelize.sync().then(console.log('sync')).catch(err => console.log(err))

module.exports = db;
