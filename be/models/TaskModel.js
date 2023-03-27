import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Task = db.define('tasks',{
    date:{
        type: DataTypes.DATEONLY
    },
    start:{
        type: DataTypes.TIME
    },
    end:{
        type: DataTypes.TIME
    },
    client:{
        type: DataTypes.STRING
    },
    project:{
        type: DataTypes.STRING
    },
    taskDescription:{
        type: DataTypes.TEXT
    },
},{
    freezeTableName:true
});

export default Task;