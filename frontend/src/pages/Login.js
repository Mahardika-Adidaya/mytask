import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import Api from "../Api";

const Login = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const data = async() =>{
        try {
            const response = await Api.Login(email, password)
            navigate("/input-task")
        } catch (error) {
            // simpan alert disini
            window.alert("Email atau password salah!");
        }
    }

    return(
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="flex items-center mb-6 text-2xl font-extrabold text-gray-900 dark:text-white">
                    🤖Report Daily Task  
                    </div>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                           
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input onChange={(e) => setEmail(e.target.value)} type="text" name="" id="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email"/>
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="" id="" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-8"/>
                                </div>

                                <button onClick={data} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Log in</button>

                        </div>
                    </div>
                </div>
                </section>
        </div>
    )
}

export default Login

            // <div className="container font-poppins">
            //     <div className="grid grid-cols-2">
            //         <div className="ml-7">
            //             <div className="mt-[30px] ml-[91px]">
            //                 <img src={GambarBuku} alt="" className="h-[170px] w-[170px]"/>
            //                 <h1 className="text-[32px] font-bold mb-[30px]">My Task</h1>
            //             </div>
            //             <div className="ml-[122px]">
            //                 <h1 className="text-[28px] font-medium mb-[31px]">Login</h1>
            //                 <h2 className="text-[20px] font-medium">Email</h2>
            //                 <input type="text" name="" id="" className="border rounded-lg py-[12px] px-[14px] placeholder:text-[16px] mb-[16px] w-[464px]" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}/>
            //                 <h2 className="text-[20px] font-medium">Password</h2>
            //                 <input type="password" name="" id="" className="border rounded-lg py-[12px] px-[14px] placeholder:text-[16px] w-[464px] mb-[50px]" placeholder="Enter Email" onChange={(e) => setPassword(e.target.value)}/>
            //                  <button onClick={data} className="bg-gradient-to-r from-cyan-500 to-blue-500  h-[50px] rounded-lg font-medium text-white w-[464px] ">Login</button>
            //             </div>
            //         </div>
            //         <div className="bg-[#EB0019CC]">
            //             <img src={GambarLogin} alt="gambar kanan" className="px-[60px] py-[58px]"/>
            //         </div>
            //     </div>
            // </div>