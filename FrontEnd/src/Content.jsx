import React, { useState, useContext, useEffect } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import UserContext from './Components/Context/UserContext';
import '@fortawesome/fontawesome-free/css/all.css';
import Swal from 'sweetalert2';

function Content() {
    const [uploader, setUploader] = useState("")
    const [heading, setHeading] = useState("")
    const [content, setContent] = useState("")
    const [type, setType] = useState("")
    const [isSaved, setIsSaved] = useState("")
    const [isUpVoted, setIsUpVoted] = useState("")
    const [isDownVoted, setIsDownVoted] = useState("")
    const [votes, setVotes] = useState('false')
    const [upvote, setUpvote] = useState("")
    const [downvote, setDownvote] = useState("")
    const { userName, status } = useContext(UserContext)
    const { id } = useParams()


    const navigate = useNavigate();
    const report = () => {
        fetch(`http://127.0.0.1:8080/Report`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uname: userName, conid: id })
        }).then(response => {
            if (response.ok) {
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Reported",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            else {
                Swal.fire({
                    title: "Already Reported",
                    icon: "warning",
                })
            }
        })
    }
    const upVoting = () => {
        fetch(`http://127.0.0.1:8080/Upvote`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uname: userName, contid: id })
        }).then(response => {
            if (response.ok) {
                if (votes == 'true') {
                    setVotes('false')
                }
                else {
                    setVotes('true')
                }
            }
        })
    }
    const downVoting = () => {
        fetch(`http://127.0.0.1:8080/Downvote`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uname: userName, contid: id })
        }).then(response => {
            if (response.ok) {
                if (votes == 'true') {
                    setVotes('false')
                }
                else {
                    setVotes('true')
                }
            }
        })
    }
    const save = () => {
        fetch(`http://127.0.0.1:8080/Save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uname: userName, conid: id })
        }).then(response => {
            if (response.ok) {
                if (votes == 'true') {
                    setVotes('false')
                }
                else {
                    setVotes('true')
                }
            }
        })
    }
    const deleteContent = () => {
        fetch(`http://127.0.0.1:8080/DeleteContent?conid=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            if (response.ok) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your Content has been deleted.",
                    icon: "success"
                });
                window.history.back();
            }
        })
    }

    useEffect(() => {
        if (userName == "null") {
            navigate("/login");
            window.location.reload();
        }
        else {
            fetch(`http://127.0.0.1:8080/GetContent?id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(response => response.json())
                .then(data => {
                    setUploader(data.uploader)
                    setHeading(data.heading)
                    setContent(data.content)
                    setUpvote(data.upVote)
                    setDownvote(data.downVote)
                    setType(data.type)
                })
            fetch(`http://127.0.0.1:8080/IsSaved?uname=${userName}&conid=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(response => response.text())
                .then(data => {
                    if (data == "true") {
                        setIsSaved("true")
                    }
                    else {
                        setIsSaved("false")
                    }
                })
            fetch(`http://127.0.0.1:8080/IsUpvoted?uname=${userName}&conid=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(response => response.text())
                .then(data => {
                    if (data == "true") {
                        setIsUpVoted("true")
                    }
                    else {
                        setIsUpVoted("false")
                    }
                })
            fetch(`http://127.0.0.1:8080/IsDownvoted?uname=${userName}&conid=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(response => response.text())
                .then(data => {
                    if (data == "true") {
                        setIsDownVoted("true")
                    }
                    else {
                        setIsDownVoted("false")
                    }
                })
        }
    }, [votes])

    if (status != 'admin') {
        return (

            <div className='flex justify-center items-center mb-6'>
                <div className='h-fit w-full p-5  bg-purple-800 rounded-2xl' >

                    <div className=' w-fit mb-3 flex items-center justify-evenly text-slate-50 tracking-wide text-sm font-bold'><div className='h-fit w-fit p-2 rounded-full bg-white mr-2  text-xs text-black'>U/</div> {uploader}</div>

                    <div className="w-80 font-bold p-2 whitespace-pre-line text-slate-50">{heading}</div>

                    {type === 'text' ? (
                        <div className="min-h-[400px] h-fit min-w-full w-fit mb-5 mt-5 border-2 border-purple-600 border-solid p-3 rounded-lg whitespace-pre-line bg-gray-200">
                            <div className='whitespace-pre-line'><pre className='text-xl font-bold text-wrap break-all'>{content}</pre></div>
                        </div>) : (
                        <div className=" w-full flex justify-center rounded-lg mb-6 mt-6">
                            <img src={`http://localhost:8080/${content}`} className=' rounded-2xl ' />
                        </div>
                    )}


                    <div className='h-fit w-full flex justify-between items-center'>

                        <div className='flex justify-evenly w-24 h-fit text-4xl text-purple-600'>

                            <div className='flex flex-col justify-center items-center mr-3'>
                                <button onClick={upVoting} className='cursor-pointer w-fit '>
                                    {isUpVoted == 'true' ? (
                                        <i class="fa-regular fa-circle-up text-orange-500"></i>) : (
                                        <i class="fa-regular fa-circle-up text-gray-200"></i>
                                    )}</button>
                                <p className='text-xs font-semibold text-gray-200'>{upvote}</p>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <button onClick={downVoting} className='cursor-pointer w-fit'>
                                    {isDownVoted == 'true' ? (<i class="fa-regular fa-circle-down text-orange-500"></i>) : (
                                        <i class="fa-regular fa-circle-down text-gray-200 "></i>
                                    )}</button>
                                <p className='text-xs font-semibold text-gray-200'>{downvote}</p>
                            </div>
                        </div>
                        <div className='w-32 h-fit flex justify-between items-center'>


                            <div className='flex justify-end'>
                                {isSaved === 'true' ? (<button onClick={save} className='w-20 h-9 bg-black p-2 rounded-md text-white text-center
                    transition-all ease-in-out delay-100 hover:bg-gray-900 flex justify-center items-center'>UnSave</button>) : (
                                    <button onClick={save} className='w-20 h-9 bg-black p-2 rounded-md text-white text-center
                        transition-all ease-in-out delay-100 hover:bg-gray-900   flex justify-center items-center'>Save</button>)}
                            </div>


                            <div className='h-fit w-fit'>
                                {uploader == userName ?(<button className='p-2 border-none w-fit h-9 bg-gray-300 rounded-md text-black flex justify-center items-center
                                    transition-all ease-in-out delay-100 hover:bg-gray-400  text-2xl font-extrabold' onClick={deleteContent}>
                                    <i class="fa-solid fa-trash"></i>
                                </button>):( <button className='p-4 border-none w-fit h-9 bg-gray-200 rounded-md text-black flex justify-center items-center
                                    transition-all ease-in-out delay-100 hover:bg-gray-300  text-2xl font-extrabold' onClick={report}>
                                    <i class="fa-solid fa-exclamation"></i>
                                </button>)}

                            </div>



                        </div>


                    </div>

                </div>

            </div>
        )
    }
    else {
        return (

            <div className='flex justify-center items-center mb-6 w-full'>
                <div className='h-fit p-5 mt-10 bg-purple-800 rounded-2xl w-full'>

                    <div className=' w-fit mb-3 flex items-center justify-evenly text-white tracking-wide text-sm font-bold'><div className='h-fit w-fit p-2 rounded-full bg-white mr-2  text-xs text-black'>U/</div> {uploader}</div>
                    <div className="w-80 font-bold whitespace-pre-line text-gray-200">{heading}</div>
                    {type === 'text' ? (
                        <div className="min-h-[400px] h-fit min-w-full w-fit mb-5 mt-5 border-2 border-purple-600 bg-gray-200 border-solid p-3 rounded-lg whitespace-pre-line">
                            <div className='whitespace-pre-line'><pre className='text-xl font-bold text-wrap break-all'>{content}</pre></div>
                        </div>) : (
                        <div className=" w-full flex justify-center rounded-lg mb-6 mt-6">
                            <img src={`http://localhost:8080/${content}`} className=' rounded-2xl ' /></div>
                    )}


                    <div className='h-fit w-full flex justify-end items-center'>
                        <button className='text-2xl text-orange-500' onClick={deleteContent}>
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>

                </div>

            </div>
        )
    }
}


export default Content