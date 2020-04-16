import {Sequelize} from 'sequelize'

export const sequelize = new Sequelize(
  process.env.sql_database, // Nom de la base donnees : FSTWEBAPP1
  process.env.sql_username, // username : Dev1
  process.env.sql_password, // password : Desii12020!
  {
  dialect: 'mssql',
  host: process.env.sql_server // Server Host : 90.83.19.101
});

var Connection = require('tedious').Connection;
var config = {
    server: process.env.sql_server,  //update me
    authentication: {
        type: 'default',
        options: {
            userName: process.env.sql_username, //update me
            password: process.env.sql_password  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: process.env.sql_database  //update me
    }
};
var connection = new Connection(config);
connection.on('connect', function(err) {
    // If no error, then good to proceed.
    console.log(err);
    console.log("Connected");
    executeStatement()
    console.log('sucess');


});
var Request = require('tedious').Request
   var TYPES = require('tedious').TYPES;
async function executeStatement() {
  try {
    var request =  new Request("SELECT * FROM Clients")
    var result = await connection.execSql(request);
    console.log(result);
  } catch (e) {
    console.log(e)
  }
}

// const sequelize = new Sequelize('database', null, null, {
//   dialect: 'mssql',
//   dialectOptions: {
//     authentication: {
//       type: 'ntlm',
//       options: {
//         domain: 'yourDomain',
//         userName: 'username',
//         password: 'password'
//       }
//     },
//     options: {
//       instanceName: 'SQLEXPRESS'
//     }
//   }
// })
async function connect() {
  console.log('test');
  try {
    await sequelize.authenticate();
    console.log('DB connected !');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// connect()
