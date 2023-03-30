import Task from "../models/TaskModel.js"; 
import Users from "../models/UserModel.js";
import {Op} from "sequelize";


export const getTask = async(req, res) => {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);
    // res.status(200).json(req.params.startDate);
    try {
        let response;
        if(req.role === "admin"){
            response = await Task.findAll({
                where:{
                     date: {
                    [Op.between]: [startDate, endDate]
                    }
                },
                attributes:['uuid', 'date', 'start', 'end', 'client', 'project', 'taskDescription'],
                include:[{
                    model: Users,
                    attributes:['name', 'email'],
                }]
            });
        }else{
            response = await Task.findAll({
                attributes:['uuid', 'date', 'start', 'end', 'client', 'project', 'taskDescription'],
                where:{
                    userId: req.userId,
                    date: {
                        [Op.between]: [startDate, endDate]
                        }
                },
                include:[{
                    model: Users,
                    attributes:['name', 'email'],
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getTaskById = async(req, res) => {
    try {
        const task = await Task.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!task) return res.status(404).json({msg: "Data tidak ditemukan"})
        let response;
        if(req.role === "admin"){
            response = await Task.findOne({
                attributes:['uuid', 'date', 'start', 'end', 'client', 'project', 'taskDescription'],
                where:{
                    id: task.id
                },
                include:[{
                    model: Users,
                    attributes:['name', 'email'],
                }]
            });
        }else{
            response = await Task.findOne({
                attributes:['uuid', 'date', 'start', 'end', 'client', 'project', 'taskDescription'],
                where:{
                    [Op.and]:[{id: task.id}, {userId: req.userId}]                    
                },
                include:[{
                    model: Users,
                    attributes:['name', 'email'],
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createTask = async(req, res) => {
    const { date, start, end, client, project, taskDescription } = req.body;
    try {
        await Task .create({
            date: date,
            start: start,
            end: end,
            client: client,
            project: project,
            taskDescription: taskDescription,
            userId: req.userId
        });
        res.status(201).json({msg: "Task created sukses"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateTask = async(req, res) => {
    try {
        const task = await Task.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!task) return res.status(404).json({msg: "Data tidak ditemukan"})
        const { date, start, end, client, project, taskDescription } = req.body;
        if(req.role === "admin"){
            await Task.update({date, start, end, client, project, taskDescription},{
                where:{
                    id: task.id
                }
            });
        }else{
            if(req.userId !== task.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Task.update({date, start, end, client, project, taskDescription},{
                where:{
                    [Op.and]:[{id: task.id}, {userId: req.userId}]                    
                }
            });
        }
        res.status(200).json({msg: "Task berhasil di update"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!task) return res.status(404).json({msg: "Data tidak ditemukan"})
        const { date, start, end, client, project, taskDescription } = req.body;
        if(req.role === "admin"){
            await Task.destroy({
                where:{
                    id: task.id
                }
            });
        }else{
            if(req.userId !== task.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Task.destroy({
                where:{
                    [Op.and]:[{id: task.id}, {userId: req.userId}]                    
                }
            });
        }
        res.status(200).json({msg: "Task berhasil di hapus"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getTaskByDate = async(req, res) => {
    try {
        const task = await Task.findAll({
            where:{
                date: task.date
            }
        });
        if(!task) return res.status(404).json({msg: "Data tidak ditemukan"})
        let response;
        if(req.role === "admin"){
            response = await Task.findAll({
                attributes:['uuid', 'date', 'start', 'end', 'client', 'project', 'taskDescription'],
                where:{
                    id: task.id,
                    date: task.date
                },
                include:[{
                    model: Users,
                    attributes:['name', 'email'],
                }]
            });
        }else{
            response = await Task.findOne({
                attributes:['uuid', 'date', 'start', 'end', 'client', 'project', 'taskDescription'],
                where:{
                    [Op.and]:[{id: task.id}, {userId: req.userId}]                    
                },
                include:[{
                    model: Users,
                    attributes:['name', 'email'],
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

// const fs = require('fs');
// const pdf = require('pdf-creator-node');
// const path = require('path');

// export const generatePdf = async(req, res, next) => {
//     const html = fs.readFileSync(patch.join(__dirname, '.....'), 'utf-8');
//     const filename = Match.random() + '_doc' + '.pdf';

//     data.forEach(d => {
//         const prod ={
//             date: d.date,
//             start: d.start,
//             end: d.end,
//             project: project,
//             taskDescription: taskDescription
//         }
//         array.push(prod);
//     });
//     // const document ={
//     //     html: html,
//     //     data: {
//     //         task: obj
//     //     },
//     //     path: ''
//     // }
// }