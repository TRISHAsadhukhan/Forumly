import React, { useContext, useState,useEffect } from 'react';
import UserContext from './Components/Context/UserContext';
import {Link,NavLink,useNavigate} from 'react-router-dom'
import avatar1 from './Components/images/avatar1.png'
import avatar2 from './Components/images/avatar2.png'
import avatar3 from './Components/images/avatar3.png'
import avatar4 from './Components/images/avatar4.png'
import avatar5 from './Components/images/avatar5.png'
import avatar6 from './Components/images/avatar6.png'
import avatar7 from './Components/images/avatar7.png'
function AvatarCard() {
    const navigate = useNavigate();
    const {userName,setAvatar,status}=useContext(UserContext)
    useEffect(() => { 
        if(userName=="null"){
          navigate("/login");
        
          //window.location.reload();
        }else if(status=="admin"){
            navigate("/AdminReport");
        }},[])
    function freeAvatar(avatar){
        
            fetch(`http://127.0.0.1:8080/updateAvatar/${userName}/${avatar}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
          
        })
        .then(response => {
            if(response.ok){
                setAvatar(avatar)
            }
        }).catch(error=>{console.error()
        }
    )
        
    }
    function premAvatar(avatar){
        if(status=='free'){
            navigate('/premium')
        }
        else{
            fetch(`http://127.0.0.1:8080/updateAvatar/${userName}/${avatar}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
          
        })
        .then(response => {
            if(response.ok){
                setAvatar(avatar)
            }
        }).catch(error=>{console.error()
        }
    )
        }
    }
        
    return (
        <>
                <div className='h-fit mt-10 mb-10 ml-10 w-fit bg-slate-50 bg-opacity-0 backdrop-blur-3xl rounded-3xl p-9 flex flex-col justify-center shadow-[0_35px_10px_-16px_rgba(0,0,0.3,.2)]'>
                    <div className='h-fit w-full mb-10'>
                        <div className='text-3xl  w-fit text-white mb-5'>Free Avatars</div>
                        <div className='w-full h-42 flex justify-start items-center'>
                            <button onClick={()=>freeAvatar("avatar1.png")}><div className='h-40 w-40 mr-5 bg-purple-300 hover:bg-indigo-200 flex justify-center items-center rounded-xl cursor-pointer'>
                                <img src={avatar1} className='h-24' />
                            </div></button>
                            <button onClick={()=>freeAvatar("avatar2.png")}><div className='h-40 w-40 mr-5 bg-purple-300 hover:bg-indigo-200 flex justify-center items-center rounded-xl cursor-pointer'>
                                <img src={avatar2} className='h-28' />
                            </div></button>
                            <button onClick={()=>freeAvatar("avatar6.png")}><div className='h-40 w-40 mr-5 bg-purple-300 hover:bg-indigo-200 flex justify-center items-center rounded-xl cursor-pointer'>
                                <img src={avatar6} className='h-24' />
                            </div></button>
                        </div>
                    </div>
                    <div className='h-2/4 w-full'>
                        <div className='text-3xl  w-fit text-white mb-5'>Premium Avatars</div>
                        <div className='w-full h-42 flex justify-center items-center'>
                        <button onClick={()=>premAvatar("avatar4.png")}><div className='h-40 w-40 mr-3 bg-purple-300 hover:bg-indigo-200 flex justify-center items-center rounded-xl cursor-pointer'>
                                <img src={avatar4} className='h-24' />
                            </div></button>
                        <button onClick={()=>premAvatar("avatar5.png")}><div className='h-40 w-40 mr-3 bg-purple-300 hover:bg-indigo-200 flex justify-center items-center rounded-xl cursor-pointer'>
                                <img src={avatar5} className='h-24' />
                            </div></button>
                        <button onClick={()=>premAvatar("avatar3.png")}><div className='h-40 w-40 mr-3 bg-purple-300 hover:bg-indigo-200 flex justify-center items-center rounded-xl cursor-pointer'>
                                <img src={avatar3} className='h-24' />
                            </div></button>
                        <button onClick={()=>premAvatar("avatar7.png")}><div className='h-40 w-40 mr-3 bg-purple-300 hover:bg-indigo-200 flex justify-center items-center rounded-xl cursor-pointer'>
                                <img src={avatar7} className='h-24' />
                            </div></button>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default AvatarCard