import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Api from "../Api";
import GambarBuku from "../assets/book.png"

const Navbar = () => {

    const navigate = useNavigate()
    const goto = () =>{
        navigate('/change-password')
    }

    const logout = async() =>{
        try {
            const response = await Api.Logout()
            navigate("/")
        } catch (error) {
            // simpan alert disini
            console.log(error)
        }
    }

    const myUser = async() =>{
        try {
            const response = await Api.Me()
            // console.log(response)
        } catch (error) {
            // simpan alert disini
            navigate("/")
        }
    }
    

    useEffect(() => {
        myUser()
    })

    return(

        // <div className="font-poppins">
        //     <nav class="bg-[#EB0019] border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900 h-full">
        //         <div class="container flex flex-wrap items-center justify-between mx-auto ">
        //             <Link to='/input-task'>
        //                 <div href="https://flowbite.com/" class="flex items-center">
        //                     <img src={GambarBuku} class="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
        //                     <span class="self-center text-[24px] font-semibold whitespace-nowrap dark:text-white text-white">My Task</span>
        //                 </div>
        //             </Link>
        //             {/* <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        //             <span class="sr-only">Open main menu</span>
        //             <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        //             </button> */}
        //             <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        //                 <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-[#EB0019] dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        //                     <button onClick={goto}>
        //                         <li>
        //                             <div class=" py-2 pl-3 pr-4 text-white rounded  md:border-0  md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent lg:text-white text-[16px]">Change Password</div>
        //                         </li>
        //                     </button>
        //                         <li>
        //                             <button onClick={logout} class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent lg:text-white text-[16px]">Logout</button>
        //                         </li>

        //                 </ul>
        //             </div>
        //         </div>
        //     </nav>

        // </div>


        
        <div className="font-poppins">
            <div className="h-[88px] w-full bg-[#EB0019] fixed">
                <div className="flex relative">
                <Link to='/input-task'>
                     <div href="httpsflowbite.com/" class="flex pl-2 mt-6">
                         <img src={GambarBuku} class="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
                         <span class="self-center text-[24px] font-semibold whitespace-nowrap dark:text-white text-white">My Task</span>
                     </div>
                 </Link>
                    <div className="flex text-[16px] font-bold text-white ml-[896.5px] gap-[42px] py-[32px] absolute right-0 pr-[43.5px]">
                        <button onClick={goto}>Change Password</button>
                        <button onClick={logout} className="">Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
