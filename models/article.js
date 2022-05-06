import { Sequelize, DataTypes } from 'sequelize'
import sequelize from '../dbconfig'
import User from './user'

const Article = sequelize.define('Article', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT
    }
}, {
    timestamps: true,
})

Article.belongsTo(User)

/*
Article.sync({ force: true }).then(() => { console.log("資料表已建立") })

const test = {
    title: "test1", content: "test01" 
}

Article.create(test);
*/



export default Article