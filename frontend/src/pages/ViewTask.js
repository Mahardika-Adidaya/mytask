import React, { useState} from 'react'
import Navbar from '../components/Navbar'
import ViewTaskList from '../components/ViewTaskList'


const ViewTask = () => {

    const [showViewTaskList, setShowViewTaskList] = useState(false)
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()

    const handleClick = () => {
        setShowViewTaskList(!showViewTaskList);
      }


    return (
        <div>
            <Navbar />
            <div className='container pt-28 px-[342px]'>
                <h1 className='text-[32px] font-bold mb-[24px]'>View Task</h1>
                <input onChange={(e) => setStartDate(e.target.value)} type="date" className='w-[756px] h-[49px] rounded-lg mb-[16px] border-[#BEBEBE]'/>
                <input onChange={(e) => setEndDate(e.target.value)} type='date' className='w-[756px] h-[49px] rounded-lg mb-[16px] border-[#BEBEBE]' />
                <button onClick={handleClick} className='w-[756px] h-[49px] border rounded-lg mb-[16px] text-[16px] text-[#646464] bg-[#F6FCFF]'>View</button>
                {showViewTaskList &&
                <>
                    <ViewTaskList
                        startDate={startDate}
                        endDate={endDate}
                    />    
                </>}
                
            </div>
        </div>
    )
}

export default ViewTask