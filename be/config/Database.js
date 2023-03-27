import {Sequelize} from "sequelize";

const db = new Sequelize('mytask','root','',{
    host: "localhost",
    dialect: "mysql"
});

export default db;