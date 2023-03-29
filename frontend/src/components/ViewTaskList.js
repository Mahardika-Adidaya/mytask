import React, { useEffect, useState } from 'react'
import Api from '../Api'

function ViewTaskList() {

 const [data, setData] = useState('')

 const getData = async () =>{
    try {
        const response = await Api.getTask()
        setData(response.data)
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
 }

 useEffect(() =>{
    getData()
 }, [])

 const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('id-ID', options);
    return formattedDate;
  };
 
  const totalHour = (startTime, endTime) => {
    const start = startTime.split(':');
    const end = endTime.split(':');
  
    // konversi waktu ke menit
    const startMinutes = parseInt(start[0]) * 60 + parseInt(start[1]);
    const endMinutes = parseInt(end[0]) * 60 + parseInt(end[1]);
  
    // hitung selisih waktu dalam menit
    let totalMinutes = endMinutes - startMinutes;
  
    if (totalMinutes < 0) {
      // tambahkan 24 jam jika waktu selesai lebih kecil dari waktu mulai
      totalMinutes += 24 * 60;
    }
  
    // konversi kembali ke format HH:mm
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
  
    return `${hours.toString().padStart(1, '0')} h : ${minutes.toString().padStart(1, '0')} min`;
  };

  return (
    <div className='container w-[756px] pb-10'>
            <h1 className='text-[20px] font-bold mb-1'>TaskList</h1>
            <div className='w-full h-full rounded-lg'>
                <div className='mb-[16px]'>
                    {data &&
                        data.map((item) => (
                        <div key={item.id}>
                            <div className='grid grid-cols-2 py-[14px] px-[24px] border mb-[10px]'>
                                <div className=''>
                                    <h2>{formatDate(item.date)} - {item.start.substring(0, 5)}</h2>
                                    <h1 className='font-bold'>{item.client}</h1>
                                    <h2>{item.taskDescription}</h2>
                                    <h1 className='font-bold'>{item.project}</h1>
                                    <h2>{formatDate(item.date)}  - {item.end.substring(0, 5)}</h2>
                                </div>
                                <div className='relative'>
                                    <h1 className='absolute top-0 right-0 text-white bg-[#EB0019] w-[98px] h-[25px] text-[12px] rounded-lg flex justify-center items-center'>{item.user.name}</h1>
                                    <h1 className='absolute bottom-0 right-0 text-white bg-[#2158C1] w-[98px] h-[25px] flex justify-center items-center text-[12px] rounded-lg '>{totalHour(item.start, item.end)}</h1>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
               
                <div className='flex relative text-[16px] font-semibold mb-[16px]'>
                    <h1>Total Work Duration</h1>
                    <h1 className='absolute right-0'>7 hours 59 minutes</h1>
                </div>
                <div className='flex relative text-[16px] font-semibold mb-[16px]'>
                    <div>
                        <h1>Work Duration Project:</h1>
                        <h2>IIK SHOP</h2>
                    </div>
                    <h1 className='absolute right-0'>7 hours 59 minutes</h1>
                </div>
                <div className='flex relative text-[16px] font-semibold  mb-[32px]'>
                    <div>
                        <h1>Work Duration Client:</h1>
                        <h2>Yayasan Bhaktiwiyata</h2>
                    </div>
                    <h1 className='absolute right-0'>7 hours 59 minutes</h1>
                </div>

                <div className='flex item-center justify-center'>
                    <button type="submit" className=" bg-red-500 w-[366px] h-[50px] rounded-lg font-medium text-white">Submit</button>
                </div>
                
            </div>
        </div>
  )
}

export default ViewTaskList