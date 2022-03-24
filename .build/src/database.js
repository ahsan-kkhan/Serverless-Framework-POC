const Sequelize = require('sequelize');
// import { Sequelize } from 'sequelize';
// import pg from 'pg';
import * as pg from 'pg';
// console.log(pg);
export const sequelize = new Sequelize('postgres', 'postgres', 'admin', {
    host: 'localhost',
    dialect: 'postgres',
    dialectModule: pg,
    // pool: {
    //   max: 5,
    //   min: 0,
    //   idle: 10000
    // },
    // // SQLite only
    // storage: 'path/to/database.sqlite'
});
// let db = {
//   sequelize:sequelize,
//   Sequelize:Sequelize};
// // db.sequelize = sequelize;
// // db.Sequelize = Sequelize;
// export default db;
//# sourceMappingURL=database.js.map