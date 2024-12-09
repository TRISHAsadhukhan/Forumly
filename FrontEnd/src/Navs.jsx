import React, { useContext, useState,useEffect } from 'react';
import {Link,NavLink,useNavigate} from 'react-router-dom'
import QueryContext from './Components/Context/QueryContext';
import UserContext from './Components/Context/UserContext';
import logo from './logo.png'
import logoName from './forumly.png'
function Navs() {
  const {setQuery}=useContext(QueryContext)
  const {query}=useContext(QueryContext)
  const {userName}=useContext(UserContext)
  const navigate = useNavigate();
  const searchPage=()=>{

    if(query.length > 0){
      navigate("/search");
    }
    
  }
  useEffect(() => { 
    if(userName=="null"){
      navigate("/login");
      window.location.href = "http://localhost:5173/login";
    }
    
  },[])
  return (
    <>
     <div className="h-fit bg-black w-full flex justify-start">
      
        <div className="w-[35%] flex justify-start items-center ">
            <div className='h-[65px] w-[65px]'><Link to='/AvatarCard' className='h-fit w-fit cursor-pointer'><img src={logo} className="h-[65px] w-[65px]"/></Link></div>
            <div className='h-fit w-fit'><Link to='/AvatarCard' className='h-fit w-fit cursor-pointer'><img src={logoName} className="h-10 w-28"/></Link></div>
        </div>

        
        <div className="w-[50%] flex justify-start">
            <div className="w-fit h-full flex items-center">
              <input onClick={searchPage} type="text" placeholder=" Search..." className="h-5 w-[600px] outline-none rounded-lg  px-4  py-5"  style={{  background: 'rgb(50, 47, 47)', borderRadius: '16px', border: '1px solid rgb(234, 231, 231)', color:'rgb(234, 231, 231)'}} value={query} onChange={(e) => {setQuery(e.target.value);
                 navigate("/search");
              }} />
            </div>
        </div>
     </div>
    </>
  )
}

export default Navs
