import Sequelize  from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
  dialectOptions: {
    //useUTC: false
  },
  timezone: '+08:00', // for writing to database
});

// 測試連接
sequelize.authenticate().then(() => {
    console.log('mysql connection success.');
}).catch(err => {
    console.error('mysql connection error:', err);
});

export default sequelize