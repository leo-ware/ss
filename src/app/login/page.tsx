"use client"

import { useState } from 'react'
import { login, signup } from './actions'

export default function LoginPage() {
    const [loggingIn, setLoggingIn] = useState(true)
    return (
        <div className='col-span-4 row-span-3 row-start-2 col-start-4 flex flex-col justify-center items-center'>
            <form className='flex flex-col items-center justify-center border border-black w-60'>
                <div className='m-2 mt-6 flex flex-col items-center justify-center gap-2'>
                    {!loggingIn && <div className='relative w-full h-4'>
                        <div className='top-0 w-full h-1/2 border-b border-gray-600' />
                        <div className='absolute top-0 w-full h-full flex items-center justify-center'>
                            <div className='text-xs bg-white px-1 text-gray-800'>Account Info</div>
                        </div>
                    </div>}
                    <input className='border border-black p-1 rounded' placeholder="Email" name="email" type="email" required />
                    <input className='border border-black p-1 rounded' placeholder="Password" name="password" type="password" required />

                    {!loggingIn && <>
                        <div className='relative w-full h-4'>
                            <div className='top-0 w-full h-1/2 border-b border-gray-600' />
                            <div className='absolute top-0 w-full h-full flex items-center justify-center'>
                                <div className='text-xs bg-white px-1 text-gray-800'>Profile Info</div>
                            </div>
                        </div>
                        <input className='border border-black p-1 rounded' placeholder="First Name" name="firstName" type="text" required />
                        <input className='border border-black p-1 rounded' placeholder="Last Name" name="lastName" type="text" required />
                        <input className='border border-black p-1 rounded' placeholder="Affiliation (optional)" name="affiliation" type="text" />
                    </>}

                </div>

                <div className='flex flex-row w-full pt-2'>
                    <div
                        className={`flex-grow relative bg-gray-200 text-gray-600 flex justify-center items-center`}
                        onMouseDown={() => setLoggingIn(false)}>
                        {loggingIn
                            ? <div className='p-2'>Sign Up</div>
                            : <button
                                formAction={signup}
                                className='p-2 w-full h-full bg-white text-black'>
                                Sign Up
                            </button>
                        }
                    </div>

                    <div
                        className={`flex-grow relative bg-gray-200 text-gray-600 flex justify-center items-center`}
                        onMouseDown={() => setLoggingIn(true)}>
                        {!loggingIn
                            ? <div className='p-2'>Log In</div>
                            : <button
                                formAction={login}
                                className='p-2 w-full h-full bg-white text-black'>
                                Log In
                            </button>
                        }
                    </div>

                </div>
            </form>
        </div>
    )
}