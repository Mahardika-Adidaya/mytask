import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import Task from "./TaskModel.js";
// const task = require(TaskModel.js);

const { DataTypes } = Sequelize;

const Users = db.define('users',{
    name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName:true
});

Users.hasMany(Task, {foreignKey: 'userId'})
Task.belongsTo(Users, {targetKey: 'id'})

export default Users;