import { Sequelize, DataTypes } from 'sequelize'
import sequelize from '../dbconfig'
import User from './user'

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    rolename: {
        type: DataTypes.STRING
    }
})

//Role.hasMany(User, {as: 'role'})

//Role.create({rolename: 'user'})
//Role.create({rolename: 'admin'})

export default Role