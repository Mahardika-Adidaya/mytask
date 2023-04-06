import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Api from '../Api'

const ViewTaskList = ({startDate, endDate}) => {
 const [data, setData] = useState('')
 const [afterFilter, setAfterFilter] = useState('')
 const [durasi, setDurasi] = useState()
 const [filterDurasi, setFilterDurasi] = useState()
//  const [uuid, setUuid] = useState()

 const navigate = useNavigate()
    const goto = () =>{
        navigate('/invoice', {state: {startDate: startDate, endDate: endDate}})
    }


    const getData = async () =>{
        try {
            if(!startDate || !endDate) {
                const response = await Api.getTask()
                setData(response.data.response)
                console.log(response.data.response.id)
                
            } else {
                const filter = await Api.getFilterTask(startDate, endDate)
                setAfterFilter(filter.data.response)
                // console.log({'filter': filter.data})
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getDurasi = async () => {
        try{
            if(!startDate || !endDate){
                const response = await Api.getTask()
                setDurasi(response.data.durasiTotal)
                // console.log(response.data.durasiTotal)
            }else {
                const totalWaktu = await Api.getFilterTask(startDate, endDate)
                setFilterDurasi(totalWaktu.data.durasiTotal)
                console.log({durasi: totalWaktu.data.durasiTotal})
            }
        } catch (error) {
            console.log(error)
        }
        
    }
 
      const formatDate = (date) => {
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        
        const dateObj = new Date(date);
        const dayOfWeek = days[dateObj.getDay()];
        const dayOfMonth = dateObj.getDate();
        const month = months[dateObj.getMonth()];
        const year = dateObj.getFullYear();
        
        return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
      }
    
    function formatTimeString(dateString) {
        const dateObj = new Date(dateString);
        const time = dateObj.toTimeString().slice(0, 5);
        return time;
      }

    // const delTask = async() => {
    //     try{
    //         const task = await Api.getTask()
    //         const response = await Api.DeleteTask(task.data.response.uuid)
    //         console.log("task terhapus")
    //     }
    //     catch (error){
    //         console.log(error)
    //     }
    // }

    // function handleDelete() {
    //     const confirmed = window.confirm('Are you sure?');
    //     if (confirmed) {
    //         delTask()
    //         // alert('Task berhasil di hapus');
    //     } else {
    //         // alert('Cancel');
    //     }
    // }
      
    useEffect(() =>{
       getData()
       getDurasi()
   }, [])

  return (
    <div className='container w-full  lg:w-[756px] pb-10'>
            <h1 className='text-[20px] font-bold mb-1'>Task List</h1>
            <div className='w-full h-full rounded-lg'>
                <div className='mb-[16px]'>
                    {!startDate && !endDate ?
                        Object.values(data).map((item) => (
                            <div key={item.id} className=''>
                                {/* <button onClick={handleDelete} className='rounded ml-[400px] lg:ml-[675px] mb-1 text-sm text-red-600 font-semibold bg-slate-200 w-20'>Delete Task</button> */}
                                <div className='grid grid-cols-2 py-[14px] px-[24px] border mb-[10px]'>
                                    <div className=''>
                                        <h2>{formatDate(item.start)} - {formatTimeString(item.start)}</h2>
                                        <h1 className='font-bold'>{item.client}</h1>
                                        <h2>{item.taskDescription}</h2>
                                        <h1 className='font-bold'>{item.project}</h1>
                                        <h2>{formatDate(item.end)}  - {formatTimeString(item.end)}</h2>
                                    </div>
                                    <div className='grid grid-rows-2 gap-20 ml-auto'>
                                        <h1 className=' text-white bg-[#EB0019] w-[98px] h-[25px] text-[12px] rounded-lg flex justify-center items-center'>{item.user.name}</h1>
                                        <h1 className=' text-white bg-[#2158C1] w-[98px] h-[25px] flex justify-center items-center text-[12px] rounded-lg '>{item.durasi}</h1>
                                    </div>
                                </div>
                            </div>
                        ))
                        :
                        Object.values(afterFilter).map((item) => (
                            <div key={item.id}>
                                <div className='grid grid-cols-2 py-[14px] px-[24px] border mb-[10px]'>
                                    <div className=''>
                                        <h2>{formatDate(item.start)} - {formatTimeString(item.start)}</h2>
                                        <h1 className='font-bold'>{item.client}</h1>
                                        <h2>{item.taskDescription}</h2>
                                        <h1 className='font-bold'>{item.project}</h1>
                                        <h2>{formatDate(item.end)}  - {formatTimeString(item.end)}</h2>
                                    </div>
                                    <div className='grid grid-rows-2 gap-20 ml-auto'>
                                        <h1 className=' text-white bg-[#EB0019] w-[98px] h-[25px] text-[12px] rounded-lg flex justify-center items-center'>{item.user.name}</h1>
                                        <h1 className=' text-white bg-[#2158C1] w-[98px] h-[25px] flex justify-center items-center text-[12px] rounded-lg '>{item.durasi}</h1>
                                    </div>
                                </div>
                            </div>
                        ))

                    }
                </div>
             
                {/* <div className='flex relative text-[16px] font-semibold mb-[16px]'>
                        <h1>Total Work Duration</h1>
                        {filterDurasi ? (
                            <h1 className='absolute right-0'>{filterDurasi}</h1>
                            ) : (
                            <h1 className='absolute right-0'>{durasi}</h1>
                        )}

                </div>

                <div className='flex relative text-[16px] font-semibold mb-[16px]'>
                    <div>
                        <h1>Work Duration Per Project:</h1>
                        <h2>IIK SHOP</h2>
                    </div>
                    {filterDurasi ? (
                            <h1 className='absolute right-0'>{filterDurasi}</h1>
                            ) : (
                            <h1 className='absolute right-0'>{durasi}</h1>
                        )}
                </div>
                <div className='flex relative text-[16px] font-semibold  mb-[32px]'>
                    <div>
                        <h1>Work Duration Per Client:</h1>
                        <h2>Yayasan Bhaktiwiyata</h2>
                    </div>
                    {filterDurasi ? (
                            <h1 className='absolute right-0'>{filterDurasi}</h1>
                            ) : (
                            <h1 className='absolute right-0'>{durasi}</h1>
                        )}
                </div> */}

                <div className='flex item-center justify-center'>
                    <button onClick={goto} type="submit" className=" bg-red-500 w-[366px] h-[50px] rounded-lg font-medium text-white">Export</button>
                </div>
                
            </div>
        </div>
  )
}

export default ViewTaskList