import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Api from "../Api";

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

        <div className="font-poppins">
            <div className="h-[88px] w-full bg-[#EB0019] fixed flex lg:justify-between items-center justify-between px-5 lg:px-9">
                <Link to='/input-task'>
                     <div class="flex">
                         {/* <img class="h-9 mr-1 lg:mr-3 " alt="Flowbite Logo" /> */}
                         <span class="self-center text-[24px] font-semibold whitespace-nowrap dark:text-white text-white">My Task</span>
                     </div>
                 </Link>
                    <div className="flex text-[16px] font-bold text-white gap-3 lg:gap-[42px] lg:py-[32px]">
                        <button onClick={goto}>Change Password</button>
                        <button onClick={logout} className="">Logout</button>
                    </div>
            </div>
        </div>
    )
}

export default Navbar
