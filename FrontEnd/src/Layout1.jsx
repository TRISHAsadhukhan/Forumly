import React, { useState, useEffect ,useContext} from 'react';
import { Outlet } from 'react-router-dom';
import Navs from './Navs.jsx';
import Profile from './Profile.jsx';
import Comms from './Comms.jsx'
import {Link,NavLink,useNavigate} from 'react-router-dom'
function Layout1(){
    const navigate = useNavigate();
    
    let u=0
    useEffect(() => {
        let x=window.location.href.toLowerCase()
        console.log(x.includes("avatarcard"))
    },[])
    return <>
    
    <div className='fixed top-0 w-full'><Navs/></div>
    <div className='flex h-fit justify-between'>
        <div className='flex flex-col items-center fixed left-0 top-20 bottom-5 w-fit'><Profile/></div>
        <div className='flex justify-center items-center w-full mt-0 min-h-screen ml-6'><Outlet/></div>
        <div className='flex flex-col items-center fixed right-0 top-20 bottom-5 w-fit'><Comms/></div>
    </div>

    
    </>
  
}

export default Layout1