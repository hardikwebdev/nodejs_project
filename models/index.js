'use strict';
require('dotenv').config();
let fs = require('fs');
let path = require('path');
let Sequelize = require('sequelize');
let basename = path.basename(__filename);
let db = {};

let opt = {
  host: CONFIG.db_host,
  dialect: CONFIG.db_dialect,
  port: CONFIG.db_port,
  timezone: CONFIG.timezone,
  dialectOptions: {
    connectTimeout: 60000,
    dateStrings: true,
    // typeCast: true
  },
};

if (process.env.NODE_ENV == 'production') {
  opt.logging = false;
}

const sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user, CONFIG.db_password, opt);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    let model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;