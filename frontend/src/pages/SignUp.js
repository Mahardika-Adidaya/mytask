import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Api from '../Api'

const SignUp = () => {

    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()


    const navigate = useNavigate()

    const postData = async (e) =>{
        try {
            const data ={
                name: username,
                email: email,
                password: password,
                confPassword: confirmPassword,
                role: "user"
            }
            console.log(data)
            const response = await Api.postUser(data)
            console.log(response)
            alert('Akun Berhasil di Buat!');
            
        } catch (error) {
            console.log(error)
        }
    }

    
  return (
    <div>
        <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-10">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                            Buat Akun
                        </h1>
                        <div class="space-y-4 md:space-y-6">
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input onChange={(e) => setEmail(e.target.value)} type="email"class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required=""/>
                            </div>
                            <div>
                                <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                <input onChange={(e) => setUsername(e.target.value)} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input onChange={(e) => setPassword(e.target.value)} type="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                            </div>
                            <div>
                                <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input onBlur={(e) => {
                                    if (e.target.value !== password) {
                                    alert("Password and Confirm Password must match");
                                    } else{
                                        setConfirmPassword(e.target.value)
                                    }
                                }} type="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                            </div>
                            <button onClick={postData} type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Sudah punya akun? <span onClick={() => (navigate('/'))} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login disini</span>
                                </p>
                        </div>
                    </div>
                </div>
                </div>
            </section>
    </div>
  )
}

export default SignUp