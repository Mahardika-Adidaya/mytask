import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const Login = async (req, res) =>{
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user.password);
        if(!match) return res.status(400).json({msg: "wrong password"});
        req.session.userId = user.uuid;
        const uuid = user.uuid;
        const name = user.name;
        const email = user.email;
        const role = user.role;
        res.status(200).json({uuid, name, email, role});
    } catch (error) {
        res.status(404).json({msg: "user tidak ditemukan"});
    }
}

export const Me = async (req, res) => {
    if(!req.session.userId){
        return res.status(401).json({msg: "mohon login akun anda"});
    }
    const user = await User.findOne({
        attributes:['uuid','name','email','role'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "user tidak ditemukan"});
    res.status(200).json(user);
}

export const Logout = (req, res) => {
    req.session.destroy(err=>{
        if(err) return res.status(400).json({msg: "Tidak dapat logout"});
        res.status(200).json({msg: "anda telah logout"});
    });
}