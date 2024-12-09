import React, { useState, useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navs from './Navs.jsx';
import Profile from './Profile.jsx';
import Comms from './Comms.jsx'
import QueryContextProvider from './Components/Context/QueryContextProvider.jsx';
import UserContextProvider from './Components/Context/UserContextProvider.jsx';
import video from './video.mp4'


function Layout2() {
    let x = window.location.href.toLowerCase()
    if (x.includes("register") || x.includes("forgotpassword") || x.includes("login")) {
        return (
            <>
                <QueryContextProvider>
                    <UserContextProvider>
                        <Outlet />
                    </UserContextProvider>
                </QueryContextProvider>

            </>
        )
    }
    else {
        return (<>
            <QueryContextProvider>
                <UserContextProvider>
                
                    <div className='fixed top-0 w-full z-10'><Navs /></div>
                    <video autoPlay muted loop id="myVideo" className="min-h-full min-w-full fixed right-0 bottom-0 bg-cover h-auto w-auto" src= {video} type="video/mp4"></video>
                    <div className='flex justify-between'>
                        <div className='flex flex-col items-center fixed left-0 top-20 bottom-5 w-fit'><Profile /></div>
                        <div className='flex justify-center items-center w-full mt-0 min-h-screen ml-6'><Outlet /></div>
                        <div className='flex flex-col items-center fixed right-0 top-20 bottom-5 w-fit'><Comms /></div>
                    </div>
                    
                </UserContextProvider>
            </QueryContextProvider>

        </>)
    }
}



export default Layout2