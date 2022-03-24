const Sequelize = require('sequelize');
// import { DataTypes } from 'sequelize';
// const Sequelize =require(sequelize)
// const db = require('../database'),
//     sequelize = db.sequelize,
//     Sequelize=db.Sequelize;
// const Sequelize = db.Sequelize;
import { sequelize } from '../database';
// console.log(sequelize);
const Badges = sequelize.define('badges', {
    badgeid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    badgeTitle: Sequelize.STRING,
    badgeImage: Sequelize.STRING,
    badgeStatus: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    deletedAt: Sequelize.DATE,
});
// const { Sequelize, DataTypes, Model } = require('sequelize');
// // import {sequelize} from '../database';
// import pg from 'pg';
// const sequelize: any = new Sequelize(
//     'postgres',
//      'postgres',
//       'admin',
//       {
//     host: 'localhost',
//     dialect: 'postgres',
//     dialectModule: pg,
//     // pool: {
//     //   max: 5,
//     //   min: 0,
//     //   idle: 10000
//     // },
//     // // SQLite only
//     // storage: 'path/to/database.sqlite'
//   });
// class Badges extends Model {}
// Badges.init({
//     badgeid: 
//     {
//         type:DataTypes.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true
//     },
//     badgeTitle: DataTypes.STRING,
//     badgeImage: DataTypes.STRING,
//     badgeStatus: DataTypes.STRING,
//     createdAt: DataTypes.DATE,
//     updatedAt: DataTypes.DATE,
//     deletedAt: DataTypes.DATE,
//   }, {
//     // Other model options go here
//     sequelize, // We need to pass the connection instance
//     modelName: 'Badges' // We need to choose the model name
//   });
sequelize.sync();
export default Badges;
//# sourceMappingURL=Badges.js.map