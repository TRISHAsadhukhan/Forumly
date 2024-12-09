import React, { useState,useContext,useEffect } from 'react';
import {Link,NavLink,useNavigate} from 'react-router-dom'
import UserContext from './Components/Context/UserContext';
import '@fortawesome/fontawesome-free/css/all.css';

function Profile() {
    const navigate = useNavigate();
    const { status, avatar, userName,setUserName, setStatus, setAvatar } = useContext(UserContext);
    const invalidate=()=>{
        window.location.href = "http://localhost:5173/login";
        setUserName("null");
        setAvatar("null");
        setStatus("null");
        setAvatars("null");
        navigate("/login");
        

    };

    
    if(status==="free"){
      return (
        <>
        <div className='flex items-center h-[870px] w-[380px] justify-center'>
        <div className='h-full w-fit inline-block p-16 bg-white rounded-3xl shadow-xl min-w-[350px]' style={{  background: 'rgba(25, 25, 25, 0.65)', borderRadius: '16px', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', WebkitBackdropFilter: 'blur(8px)', backdropFilter: 'blur(8px)', border: '1px solid rgba(18, 18, 18, 1)'}}>
            <div className='mb-[5rem] flex  flex-col items-center text-white justify-center'>
                <img src={`http://localhost:8080/Avatars/${avatar}`} className='h-60 w-fit '/>
                <div className='text-lg tracking-wide mt-3'>{userName}</div>
            </div>
            <div className='mb-10'>
                <div className='flex justify-center'>
                <Link to="/AvatarCard"><button className='w-[10rem] h-[3rem] border-none bg-black transition-all ease-in-out delay-100 hover:bg-orange-400 text-xl text-white rounded-xl shadow-[0_35px_40px_-16px_rgba(0,0,0.3)]'>
                        Avatar
                    </button></Link>
                </div>
            </div>
            <div className='mb-10'>
                <div className='flex justify-center'>
                    <Link to="/MyPosts"><button className='w-[10rem] h-[3rem] border-none bg-black transition-all ease-in-out delay-100 hover:bg-orange-400 text-xl text-white rounded-xl shadow-[0_35px_40px_-16px_rgba(0,0,0.3)]'>
                        My Posts
                    </button></Link>
                </div>
            </div>
            <div className='mb-10'>
                <div className='flex justify-center'>
                <Link to="/Saved"><button className='w-[10rem] h-[3rem] border-none bg-black transition-all ease-in-out delay-100 hover:bg-orange-400 text-xl text-white rounded-xl shadow-[0_35px_40px_-16px_rgba(0,0,0.3)]'>
                        Saved
                    </button></Link>
                </div>
            </div>
            <div className='mb-10'>
            <div className='flex justify-center'>
            <Link to="/Premium"><button className='w-[10rem] h-[3rem] border-none bg-black transition-all ease-in-out delay-100 hover:bg-orange-400 text-xl text-white rounded-xl shadow-[0_35px_40px_-16px_rgba(0,0,0.3)]'>
                        Premium
                    </button></Link>
                </div>
            </div>
            <div className='mb-10'>
                <div className='flex justify-center'>
                    <button onClick={invalidate} className='w-[10rem] h-[3rem] border-none bg-black transition-all ease-in-out delay-100 hover:bg-orange-400 text-xl text-white rounded-xl shadow-[0_35px_40px_-16px_rgba(0,0,0.3)]'>
                        logout
                    </button>
                </div>
            </div>

            
          </div>
        </div>
          


        </>
    );}
    else if(status==="Prime"){
        return (
        <>
        <div className='flex items-center h-[870px] w-[380px] justify-center' >
        <div className='h-full w-fit inline-block p-16 bg-white rounded-3xl shadow-xl min-w-[350px]' style={{  background: 'rgba(25, 25, 25, 0.65)', borderRadius: '16px', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', WebkitBackdropFilter: 'blur(8px)', backdropFilter: 'blur(8px)', border: '1px solid rgba(18, 18, 18, 1)'}}>
            <div className='mb-[5rem] flex flex-col items-center text-white justify-center'>
                <img src={`http://localhost:8080/Avatars/${avatar}`} className='h-60 w-fit '/>
                <div className='text-lg tracking-wide mt-3'>{userName}<i class="fa-solid fa-crown ml-2 text-yellow-400"></i></div>
            </div>
            <div className='mb-10'>
                <div className='flex justify-center'>
                <Link to="/AvatarCard"><button className='w-[10rem] h-[3rem] border-none bg-black transition-all ease-in-out delay-100 hover:bg-orange-400 text-xl text-white rounded-xl shadow-[0_35px_40px_-16px_rgba(0,0,0.3)]'>
                        Avatar
                    </button></Link>
                </div>
            </div>
            <div className='mb-10'>
                <div className='flex justify-center'>
                    <Link to="/MyPosts"><button className='w-[10rem] h-[3rem] border-none bg-black transition-all ease-in-out delay-100 hover:bg-orange-400 text-xl text-white rounded-xl shadow-[0_35px_40px_-16px_rgba(0,0,0.3)]'>
                        My Posts
                    </button></Link>
                </div>
            </div>
            <div className='mb-10'>
                <div className='flex justify-center'>
                <Link to="/Saved"><button className='w-[10rem] h-[3rem] border-none bg-black transition-all ease-in-out delay-100 hover:bg-orange-400 text-xl text-white rounded-xl shadow-[0_35px_40px_-16px_rgba(0,0,0.3)]'>
                        Saved
                    </button></Link>
                </div>
            </div>
            <div className='mb-10'>
            <div className='flex justify-center'>
            <Link to='NewComm'> <button className='w-[10rem] h-[3rem] border-none bg-black transition-all ease-in-out delay-100 hover:bg-orange-400 text-xl text-white rounded-xl shadow-[0_35px_40px_-16px_rgba(0,0,0.3)]'>
                        Community
                    </button></Link>
                </div>
            </div>
            <div className='mb-10'>
                <div className='flex justify-center'>
                    <button onClick={invalidate} className='w-[10rem] h-[3rem] border-none bg-black transition-all ease-in-out delay-100 hover:bg-orange-400 text-xl text-white rounded-xl shadow-[0_35px_40px_-16px_rgba(0,0,0.3)]'>
                        logout
                    </button>
                </div>
            </div>
          </div>
        </div>
        </>
      );}
      else{
        return (
          <>
            <div className='flex items-center h-[870px] w-[380px] justify-center'>
            <div className='h-full w-fit inline-block p-16 bg-white rounded-3xl shadow-xl pt-[10rem] pb-[10rem] min-w-[350px]' style={{  background: 'rgba(25, 25, 25, 0.65)', borderRadius: '16px', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', WebkitBackdropFilter: 'blur(8px)', backdropFilter: 'blur(8px)', border: '1px solid rgba(18, 18, 18, 1)'}}>
                <div className='mb-[7rem] flex justify-center'>
                    <img src={`http://localhost:8080/Avatars/${avatar}`} className='h-60 w-fit '/>
                </div>
                <div className='mb-[4rem]'>
                    <div className='flex justify-center'>
                        <Link to='/AdminReport'><button className='w-[10rem] h-[3rem] border-none bg-black transition-all ease-in-out delay-100 hover:bg-orange-400 text-xl text-white rounded-xl shadow-[0_35px_40px_-16px_rgba(0,0,0.3)]'>
                            Reports
                        </button></Link>
                    </div>
                </div>
                <div className='mb-[4rem]'>
                    <div className='flex justify-center'>
                        <button onClick={invalidate} className='w-[10rem] h-[3rem] border-none bg-black transition-all ease-in-out delay-100 hover:bg-orange-400 text-xl text-white rounded-xl shadow-[0_35px_40px_-16px_rgba(0,0,0.3)]'>
                            logout
                        </button>
                    </div>
                </div>
  
              
            </div>
            </div>
  
  
          </>
      );}
    }

export default Profile;