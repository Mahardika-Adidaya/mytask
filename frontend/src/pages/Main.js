import React, { useState } from "react";
import { Link } from "react-router-dom";
import Api from "../Api";
import Navbar from "../components/Navbar";

const Main = () =>{

    const [date, setDate] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [client, setClient] = useState('')
    const [project, setProject] = useState('')
    const [taskDescription, setTaskDescription] = useState('')

    const addTask = async () =>{

        try {
            const task ={
                date: date,
                start: start,
                end: end,
                client: client,
                project: project,
                taskDescription:taskDescription,
            }

            console.log(task)
            const response = await Api.Task(task)

        } catch (error) {
            console.log(error)
        }

    }

    return(
        <div>
            <Navbar />
                <div className="container px-[342px] font-poppins">
                    <div clasName="mt-12">
                        <div className="flex items-center relative">
                            <h1 className="text-[32px] font-semibold mr-[500px] mt-[35px]">Entry Task</h1>
                            <Link to='view-task'>
                                <button className="bg-[#EB0019] rounded-full text-white w-[100px] h-[36px] text-[14px] font-medium absolute right-0">View Task</button>
                            </Link>
                        </div>
                    </div>

                    <div className="mt-[24px] mb-[15px]">
                        <h1 className="text-[20px] font-medium mb-[2px]">Date</h1>
                        <input onChange={(e) => setDate(e.target.value)} className="border-[#BEBEBE] rounded-lg w-full h-[49px] shadow py-[12px] pl-[23px] pr-[24px] appearance-none border-none text-[16px]" type='date'/>
                    </div>
                    <div className="mt-[24px] mb-[15px]">
                        <h1 className="text-[20px] font-medium mb-[2px]">Start</h1>
                        <input onChange={(e) => setStart(e.target.value)} className="border-[#BEBEBE] rounded-lg w-full h-[49px] shadow py-[12px] pl-[23px] pr-[24px] appearance-none border-none text-[16px]" type="time"/>
                    </div>
                    <div className="mt-[24px] mb-[15px]">
                        <h1 className="text-[20px] font-medium mb-[2px]">End</h1>
                        <input onChange={(e) => setEnd(e.target.value)} className="border-[#BEBEBE] rounded-lg w-full h-[49px] shadow py-[12px] pl-[23px] pr-[24px] appearance-none border-none text-[16px]" type="time" />
                    </div>
                    <div className="mt-[24px] mb-[15px]">
                        <h1 className="text-[20px] font-medium mb-[2px]">Client</h1>
                        <select onChange={(e) => setClient(e.target.value)} className="h-full rounded-lg appearance-none  border-none text-[16px] border-[#BEBEBE]  w-full  shadow py-[12px] pl-[23px]">
                            <option value="">Some option</option>
                            <option value="Client1">Other option</option>
                        </select>
                    </div>
                    <div className="mt-[24px] mb-[15px]">
                        <h1 className="text-[20px] font-medium mb-[2px]">Project</h1>
                        <select onChange={(e) => setProject(e.target.value)} className="h-full rounded-lg appearance-none  border-none text-[16px] border-[#BEBEBE]  w-full  shadow py-[12px] pl-[23px]">
                            <option value="">Some option</option>
                            <option value="Project1">Other option</option>
                        </select>
                    </div>
                    
                    <div className="mt-[24px] mb-[15px]">
                        <h1 className="text-[20px] font-medium mb-[2px]">Project</h1>
                        <textarea onChange={(e) => setTaskDescription(e.target.value)} type="text" name="" id="" placeholder="Write task description here" className="border-[#BEBEBE] rounded-lg w-full shadow py-[12px] pl-[23px] resize-none" rows="6"></textarea>
                    </div>

                    <div className="flex gap-[24px] justify-center items-center mb-[59px]">
                        <button onClick={addTask} type="submit" className="bg-gradient-to-r from-cyan-500 to-blue-500 w-[366px] h-[50px] rounded-lg font-medium text-white">Submit</button>
                    </div>
                </div>
        </div>
    )
}

export default Main