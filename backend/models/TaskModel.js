import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";


const {DataTypes} = Sequelize;

const Task = db.define('task',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    date:{
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    start:{
        type: DataTypes.DATE,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    end:{
        type: DataTypes.DATE,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    durasi:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: true
        }
    },
    menit:{
        type: DataTypes.INTEGER,
        allowNull: true,
        validate:{
            notEmpty: true
        }
    },
    client:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    project:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    taskDescription:{
        type: DataTypes.TEXT,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },

},{
    freezeTableName: true
});

Users.hasMany(Task);
Task.belongsTo(Users, {foreignKey: 'userId'});

export default Task;