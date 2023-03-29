import React, { useState} from 'react'
import Navbar from '../components/Navbar'
import ViewTaskList from '../components/ViewTaskList'

const ViewTask = () => {

    const [showViewTaskList, setShowViewTaskList] = useState(false)

    const handleClick = () => {
        setShowViewTaskList(!showViewTaskList);
      }

    return (
        <div>
            <Navbar />
            <div className='container pt-[35px] px-[342px]'>
                <h1 className='text-[32px] font-bold mb-[24px]'>View Task</h1>
                <input type="date" className='w-[756px] h-[49px] rounded-lg mb-[16px] border-[#BEBEBE]'/>
                <input type='date' className='w-[756px] h-[49px] rounded-lg mb-[16px] border-[#BEBEBE]' />
                
                <button onClick={handleClick} className='w-[756px] h-[49px] border rounded-lg mb-[16px] text-[16px] text-[#646464] bg-[#F6FCFF]'>View</button>
                {showViewTaskList &&
                <>
                    <ViewTaskList/>    
                </>}
                


                
            </div>
        </div>
    )
}

export default ViewTask