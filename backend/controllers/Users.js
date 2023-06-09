import Users from "../models/UserModel.js"; 
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
    try {
        const response = await Users.findAll({
            attributes:['uuid','name','email','role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getUsersById = async (req, res) => {
    try {
        const response = await Users.findOne({
            attributes:['uuid','name','email','role'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createUsers = async (req, res) => {
    const {name, email, password, confPassword, role} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        });
        res.status(201).json({msg: "Register berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateUsers = async(req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "user tidak ditemukan"});
    const {name, email, password, confPassword, role} = req.body;
    let hashPassword;
    const salt = await bcrypt.genSalt();
    if(password === "" || password === null){
        hashPassword = user.password
    }else{
        hashPassword = await bcrypt.hash(password, salt);
    }
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    try {
        await Users.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        },{
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteUsers = async(req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "user tidak ditemukan"});
    try {
        await Users.destroy({
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const changePassword = async(req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "user tidak ditemukan"});
    const {password, confPassword} = req.body;
    let hashPassword;
    const salt = await bcrypt.genSalt();
    if(password === "" || password === null){
        hashPassword = user.password
    }else{
        hashPassword = await bcrypt.hash(password, salt);
    }
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    try {
        await Users.update({
            password: hashPassword
        },
        {
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "Password updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}