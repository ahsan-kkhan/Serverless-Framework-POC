const Sequelize = require('sequelize');
// Import sequelize object, 
// Database connection pool managed by Sequelize.
// const sequelize = require('../database')
import { sequelize } from '../database';
const Student = sequelize.define('students', {
    studentid: { type: Sequelize.INTEGER,
        // To increment user_id automatically.
        autoIncrement: true,
        // user_id can not be null.
        allowNull: false,
        // For uniquely identify user.
        primaryKey: true },
    studentname: Sequelize.STRING,
    studentage: Sequelize.INTEGER,
    studentdepartment: Sequelize.STRING,
    studentsemester: Sequelize.INTEGER,
    studentbatch: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});
sequelize.sync();
export default Student;
//# sourceMappingURL=student.js.map