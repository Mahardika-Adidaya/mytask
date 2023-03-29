import React from 'react'

const Invoice = () => {
  return (
    <div className='container ml-[45px] font-poppins w-[595px] h-[842px]'>
        <div className='mt-[40px] flex items-center justify-center'>
          <h1 className='text-[24px] font-bold'>My Task</h1>
          <div className='ml-[85px] text-[20px]'>
            <h2 className='font-bold text-[#053095]'>Team Member Daily Report</h2>
            <h2 className='font-medium text-[#053095]'>Hartsimagineering Project Logs</h2>
          </div>
        </div>
        <hr/>
        <div className='mt-[16px]'>
          <h1 className='text-[15px] font-medium'>Name: <span>Rizieq</span></h1>
          <h1 className='text-[15px] font-medium mb-[30px]'>Date:<span>13-03-2023 Until 13-03-202</span></h1>
          <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-[31px]">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" class="p-6 py-3">
                              No.
                          </th>
                          <th scope="col" class="px-6 py-3">
                              Date & Time
                          </th>
                          <th scope="col" class="px-6 py-3">
                              Project
                          </th>
                          <th scope="col" class="px-6 py-3">
                              Description
                          </th>
                          <th scope="col" class="px-6 py-3">
                              Duration
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              1.
                          </th>
                          <td class="px-6 py-4">
                              13 Mar 2023 - 08:00
                          </td>
                          <td class="px-6 py-4">
                              IIK SHOP
                          </td>
                          <td class="px-6 py-4">
                              Layouting template
                          </td>
                          <td class="px-6 py-4">
                              4 h 0 min
                          </td>
                      </tr>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              2.
                          </th>
                          <td class="px-6 py-4">
                              13 Apr 2023 - 09:00
                          </td>
                          <td class="px-6 py-4">
                              IIK SHOP
                          </td>
                          <td class="px-6 py-4">
                              Layouting template dan Consuming API
                          </td>
                          <td class="px-6 py-4">
                              4 h 0 min
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div> 

          <div className='flex relative text-[16px] font-medium mt-[16px]'>
                    <h1>Total Work Duration</h1>
                    <h1 className='absolute right-0'>7 hours 59 minutes</h1>
                </div>
                <div className='flex relative text-[16px] font-medium mt-[16px]'>
                    <div>
                        <h1>Total Work Duration</h1>
                        <h2>IIK SHOP</h2>
                    </div>
                    <h1 className='absolute right-0'>7 hours 59 minutes</h1>
                </div>
                <div className='flex relative text-[16px] font-medium mt-[16px]'>
                    <div>
                        <h1>Work Duration Client</h1>
                        <h2>Yayasan Bhaktiwiyata</h2>
                    </div>
                    <h1 className='absolute right-0'>7 hours 59 minutes</h1>
                </div>

        <h1 className='mt-[16px] font-medium'>Dicetak oleh <span>Aditya</span> pada <span>16 Mar 2023 - 16:48:05</span></h1>
        
      </div>
    </div>
  )
}

export default Invoice