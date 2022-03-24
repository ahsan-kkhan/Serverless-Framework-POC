import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
// import db from 'D:/backend training/myservice-typescript/models'
import Student from '../models/student'
// var Sequelize = require('sequelize');
// var sequelize = new Sequelize('postgres', 'postgres', 'admin',{
//   host: 'localhost',
//   dialect: 'postgres'

//   // pool: {
//   //   max: 5,
//   //   min: 0,
//   //   idle: 10000
//   // },

//   // // SQLite only
//   // storage: 'path/to/database.sqlite'
// });



export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
      console.log("entering db");
      // const Student = sequelize.define('students', {
      //   studentid: {type:Sequelize.INTEGER,
  
      //     // To increment user_id automatically.
      //     autoIncrement:true,
    
      //     // user_id can not be null.
      //     allowNull:false,
    
      //     // For uniquely identify user.
      //     primaryKey:true},
      //     studentname: Sequelize.STRING, 
      //     studentage: Sequelize.INTEGER, 
      //     studentdepartment: Sequelize.STRING,
      //     studentsemester: Sequelize.INTEGER, 
      //     studentbatch: Sequelize.STRING,
      //     createdAt: Sequelize.DATE,
      //     updatedAt: Sequelize.DATE,
      // })
      // sequelize.sync()  
      // sequelize.sync({force:true})
      // Student
      //   .build({ title: 'foo', rating:3})
        // .save()
        // .then(anotherTask => {
        //   console.log("entering1 db");
        //   // you can now access the currently saved task with the variable anotherTask... nice!
        // })
        // .catch(error => {
        //   console.log("entering db");
        //   // Ooops, do some error-handling
        // })
        // Student.create({  studentname:"ahsan", studentage:22, studentdepartment:"CS", studentsemester:3, studentbatch:"3" }).then(task => {
        //   // you can now access the newly created task via the variable task
        // })
        Student.create({ studentname:"ahsan", studentage:22, studentdepartment:"CS", studentsemester:3, studentbatch:"3", isAdmin: true }, { fields: [ 	'studentname', "studentage", "studentdepartment", 'studentsemester', "studentbatch" ] }).then(student => {
          // let's assume the default of isAdmin is false:
          console.log(student.get({
            plain: true
          })) // => { username: 'barfooz', isAdmin: false }
        })
      // Task.create({ title: 'foo', description: 'bar', deadline: new Date() }).then(task => {
      //   // you can now access the newly created task via the variable task
      // })
      // var Student = sequelize.define('Student', {
      //     studentid:Sequelize.NUMBER,
      //     studentname:Sequelize.STRING, 
      //     studentage:Sequelize.NUMBER, 
      //     studentdepartment:Sequelize.STRING,
      //     studentsemester:Sequelize.NUMBER, 
      //     studentbatch:Sequelize.STRING
      // });
    const response = {
      statusCode: 200,
      body: 'HELLO YOU ARE MY FRIEND!!!',
    };
    return response;
  } catch (err) {
    return {
      statusCode: 500,
      body: 'An error occured',
    };
  }
};
