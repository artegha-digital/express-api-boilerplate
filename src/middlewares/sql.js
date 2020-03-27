import {Sequelize} from 'sequelize'


export const sequelize = new Sequelize(process.env.sql_database, process.env.sql_username, process.env.sql_password, {
  dialect: 'mssql',
  dialectOptions: {
    // Observe the need for this nested `options` field for MSSQL
    options: {
      // Your tedious options here
      useUTC: false,
      dateFirst: 1
    }
  }
});
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
export async function connect() {
  try {
    await sequelize.authenticate();
    console.log('DB connected !');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
