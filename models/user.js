import { Sequelize, DataTypes } from 'sequelize'
import sequelize from '../dbconfig'
import Article from './article'
import Role from './role'

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
})

User.belongsTo(Role)

/*
User.sync({force: true}).then(res=> {
    console.log("User資料表已建立")
    
})


Role.sync({force: true}).then(res => {
    console.log("Role資料表已建立")
});
*/

export default User