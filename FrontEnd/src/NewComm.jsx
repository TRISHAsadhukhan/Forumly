import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import UserContext from './Components/Context/UserContext';
import Swal from 'sweetalert2';
// import UserContext from './Components/Context/UserContext';

function NewComm() {
    const navigate = useNavigate();
    const [communityName, setCommunityName] = useState('');
    // const {setUserName, setStatus, setAvatar } = useContext(UserContext);
    const [tags, setTags] = useState('');
    const { status, userName,newCom,setNewCom } = useContext(UserContext)



    useEffect(() => {
        if (status == "free") {
            navigate("/Premium")
        }
        else if(status=="null"){
            window.location.href = "http://localhost:5173/Login";
        }
    }, [])


    const clearError = () => {
        if (communityName == '') {
            document.getElementById("wrongname").style.visibility = 'visible';
        }
        else {
            document.getElementById("wrongname").style.visibility = 'hidden';
            fetch('http://127.0.0.1:8080/CreateComm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: userName, tags: tags, communityname: communityName})

            }).then(response => {
                if(response.ok){
                    if(newCom==false){
                        setNewCom(true)
                    }
                    else{
                        setNewCom(false)
                    }
                    navigate(`/Community/${communityName}`)
                }
                else{
                    // alert("Community Already Exists");
                    Swal.fire({
                        position: "top",
                        icon: "warning",
                        title: "Community Already Exists",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            })
            .catch(error => {
                console.log(error)
                // alert("Community Can Not Be Created")
                Swal.fire({
                    position: "top",
                    icon: "warning",
                    title: "Community Can Not Be Created",
                    showConfirmButton: false,
                    timer: 1500
                  });
                }
                )
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <>
            <div className="h-fit w-fit px-20 py-14 bg-slate-50 bg-opacity-0 backdrop-blur-3xl rounded-2xl ml-10 shadow-[0_35px_10px_-16px_rgba(0,0,0.3,.2)]">
                <div className='text-3xl font-extrabold mb-8 text-slate-50'>
                    Build your Own Community!
                </div>
                <div className="">
                    <input type="text" className="outline-none bg-inherit w-full m-2 mb-0 text-white border-dotted border-b-2 border-white pb-2 " value={communityName} onChange={(e) => {setCommunityName(e.target.value);document.getElementById("wrongname").style.visibility = 'hidden';}} placeholder="Community Name" />
                    <div className="wronginput text-small ml-2" id="wrongname">
                        Community Name can not be blank
                    </div>
                    <input type="text" className="outline-none m-2 w-full bg-inherit text-white border-dotted border-b-2 border-white pb-2" placeholder="comma separated tags" value={tags} onChange={(e) => setTags(e.target.value)} />
                </div>
                <div className="w-full mt-10 flex justify-center text-white">
                    <button className="p-2 pl-4 pr-4  bg-black rounded-2xl transition-all ease-in-out delay-100 hover:bg-purple-500 shadow-[0_35px_80px_-16px_rgba(0,0,0.3)]" onClick={clearError}>Create</button>
                </div>
            </div>

        </>
    )


}

export default NewComm