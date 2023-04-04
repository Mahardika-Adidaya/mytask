import Task from "../models/TaskModel.js"; 
import Users from "../models/UserModel.js";
import {Op} from "sequelize";
import moment from "moment";


export const getTask = async(req, res) => {
    try {
        let response;
        if(req.role === "admin"){
            response = await Task.findAll({
                // attributes:['uuid', 'date', 'start', 'end', 'client', 'project', 'taskDescription', ],
                attributes:{
                    exclude:['createdAt','updatedAt']
                },
                include:[{
                    model: Users,
                    attributes:['name', 'email'],
                }]
            });
        }else{
            response = await Task.findAll({
                // attributes:['uuid', 'date', 'start', 'end', 'client', 'project', 'taskDescription'],
                attributes:{
                    exclude:['createdAt','updatedAt' ]
                },
                where:{
                    userId: req.userId
                },
                include:[{
                    model: Users,
                    attributes:['name', 'email'],
                }]
            });
        }
        // response.push(total);
        res.status(200).json(response);    
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getTaskByDate = async(req, res) => {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);
    try {
        let response;
        if(req.role === "admin"){
            response = await Task.findAll({
                where:{
                     date: {
                    [Op.between]: [startDate, endDate]
                    }
                },
                attributes:{
                    exclude:['createdAt','updatedAt']
                },
                include:[{
                    model: Users,
                    attributes:['name', 'email'],
                }]
            });
        }else{
            response = await Task.findAll({
                attributes:{
                    exclude:['createdAt','updatedAt']
                },
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
        // response.push(total);
        // console.log(total);
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
    const startTime = moment(start);
    const endTime = moment(end);
    const diffInMinutes = endTime.diff(startTime, 'minutes');
    const diffInhours = endTime.diff(startTime, 'hours');
    try {
        await Task .create({
            date: date,
            start: start,
            end: end,
            client: client,
            project: project,
            // taskDescription: taskDescription,
            durasi: `${Math.floor(diffInhours)} jam, ${Math.floor(diffInMinutes % 60)} menit`,
            durasi: moment().format(),
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