import {Sequelize} from 'sequelize'

export const sequelize = new Sequelize(
  process.env.sql_database, // Nom de la base donnees : FSTWEBAPP1
  process.env.sql_username, // username : Dev1
  process.env.sql_password, // password : Desii12020!
  {
    dialect: 'mssql',
    host: process.env.sql_server, // Server Host : 90.83.19.101
    logging: false,
    dialectOptions: {
      options: { trustServerCertificate: false }
    }
  },
);

async function connect() {
  try {
    await sequelize.authenticate({});
    console.log('DB connected !');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connect()
