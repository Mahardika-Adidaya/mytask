import Task from "../models/TaskModel.js";

export const CreateTask = async(req, res) => {
    const { date, start, end, client, project, taskDescription } = req.body;
    try {
        await Task.create({
            date: date, 
            start: start, 
            end: end, 
            client: client, 
            project: project, 
            taskDescription: taskDescription
        }).then((result)=>{
            res.json({msg: "berhasil menambahkan data", data:result});
        })

    } catch (error) {
        console.log(error);
    }
}