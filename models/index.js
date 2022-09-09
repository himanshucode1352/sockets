'use strict';
import fs from 'fs';
import path from 'path';
import {Sequelize,DataTypes} from 'sequelize';
import { fileURLToPath } from 'url';
import User from './user.js'
import Order from './order.js'
import M_orders from './m_order.js'
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
import envConfigs from '../config/config.js'
const config = envConfigs[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    let model = import(path.join(__dirname, file))
    model=(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.User =User(sequelize,Sequelize)
db.Order=Order(sequelize,Sequelize)
db.m_orders= M_orders(sequelize,Sequelize)
export default db;