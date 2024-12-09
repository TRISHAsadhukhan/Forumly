import React, { useState, useContext, useEffect,useRef } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import SmallComm from './SmallComm';
import UserContext from './Components/Context/UserContext';
import App1 from './App1';

function Community() {
    const [joinCommunities, setJoinCommunities] = useState("false")
    const [member, setMember] = useState("false")
    const [creator, setCreator] = useState("false")
    const [members, setMembers] = useState('')
    const [result, setResult] = useState([])
    const { cname } = useParams()
    const { userName, newCom, setNewCom } = useContext(UserContext)
    const navigate = useNavigate();
    const top = useRef()
    const prime = useRef()
    const latest =useRef()

    const topList = () => {
        top.current.style.backgroundColor = "#9333EA";
        prime.current.style.backgroundColor = "black";
        latest.current.style.backgroundColor = "black";
        fetch(`http://127.0.0.1:8080/Popular?cname=${cname}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
            .then(data => {
                if (data) {
                    setResult(data)
                }
            })
    }
    const primeList = () => {
        top.current.style.backgroundColor = "black";
        prime.current.style.backgroundColor = "#9333EA";
        latest.current.style.backgroundColor = "black";
        fetch(`http://127.0.0.1:8080/Primecontent?cname=${cname}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
            .then(data => {
                if (data) {
                    setResult(data)
                    console.log(data)
                }
            })
    }
    const latestList = () => {
        top.current.style.backgroundColor = "black";
        prime.current.style.backgroundColor = "black";
        latest.current.style.backgroundColor = "#9333EA";
        fetch(`http://127.0.0.1:8080/Latest?cname=${cname}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
            .then(data => {
                if (data) {
                    setResult(data)
                }
            })
    }
    const joinCommunity = () => {
        fetch('http://127.0.0.1:8080/AddMember', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uname: userName, cname: cname })

        }).then(response => {
            if (response.ok) {
                if (joinCommunities == "true") {
                    setJoinCommunities("false")
                }
                else {

                    setJoinCommunities("true")

                }
                if (newCom == 'false') {
                    setNewCom('true')
                }
                else {
                    setNewCom('false')
                }
                console.log("success")
            }
        })
    }
    const leaveCommunity = () => {
        fetch('http://127.0.0.1:8080/RemoveMember', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uname: userName, cname: cname })

        }).then(response => {
            if (response.ok) {
                if (joinCommunities == "true") {
                    setJoinCommunities("false")
                }
                else {

                    setJoinCommunities("true")

                }
                if (newCom == false) {
                    setNewCom(true)
                }
                else {
                    setNewCom(false)
                }
                console.log("success")
            }
        })
    }
    useEffect(() => {
        if (userName == "null") {
            navigate("/login");
            window.location.reload();
        }
        else {
            fetch(`http://127.0.0.1:8080/CommunityDetails?cname=${cname}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(response => response.json())
                .then(data => {
                    setMembers(data.member_count)
                })
            fetch(`http://127.0.0.1:8080/IsMember?uname=${userName}&cname=${cname}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(response => {
                if (response.ok) {
                    setMember("true")
                }
                else {
                    setMember("false")
                }
            })
            fetch(`http://127.0.0.1:8080/IsCreator?uname=${userName}&cname=${cname}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(response => {
                if (response.ok) {
                    setCreator("true")
                }
                else {
                    setCreator("false")
                }
            })
            fetch(`http://127.0.0.1:8080/Latest?cname=${cname}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(response => response.json())
                .then(data => {
                    if (data) {
                        setResult(data)
                    }
                })


        }
    }, [cname, userName, joinCommunities])


    if (creator == "true") {
        return (
            <>
                <div className='min-h-screen min-w-[45%] ml-10 p-4 rounded-xl mt-20 bg-slate-50 bg-opacity-0 backdrop-blur-3xl'>
                    <div className='flex justify-between mb-10'>
                        <Link to={`/Community/${cname}`}><SmallComm cname={cname} /></Link>
                        <Link to={`/Upload/${cname}`} className=''><button className='rounded-xl p-0 h-full w-fit font-bold pr-4 pl-4 text-3xl text-white border-2 border-white  ml-60'>
                            +
                        </button></Link>
                    </div>
                    <div className='flex p-6 mb-6 justify-between items-center'>
                        <div className='w-[50%]  flex justify-between'>
                            <button onClick={primeList} className='bg-black text-white tracking-wider rounded-3xl h-fit w-fit py-3 px-5 transition-all ease-in-out delay-100 hover:bg-purple-600' ref={prime}>
                                Prime
                            </button>
                            <button onClick={latestList} className='bg-black text-white tracking-wider rounded-3xl h-fit w-fit py-3 px-5 transition-all ease-in-out delay-100 hover:bg-purple-600' ref={latest}>
                                Latest
                            </button>
                            <button onClick={topList} className='bg-black text-white tracking-wider rounded-3xl h-fit w-fit py-3 px-5 transition-all ease-in-out delay-100 hover:bg-purple-600'ref={top}>
                                Popular
                            </button>
                        </div>
                        <div className='text-left flex flex-col w-fit text-white tracking-widest text-xl p-3 cursor-default'>
                            <div className='text-center font-bold'>
                                {members}
                            </div> <div className='text-sm font-light'>MEMBERS</div>
                        </div>
                    </div>
                    {result.map((result, index) => (
                        <div>
                            <div className='flex w-full justify-center mb-10'>
                                <App1 id={result.id} heading={result.heading} type={result.type} content={result.content} uploader={result.uploader}
                                    upvotes={result.upVote} downvotes={result.downVote} name={result.contentName} community={result.community} />
                            </div>
                        </div>
                    ))}

                </div>
            </>
        )
    }
    else if (member == "true") {
        return (
            <>
                <div className='min-h-screen min-w-[45%] ml-10 p-4 bg-slate-50 bg-opacity-0 backdrop-blur-3xl rounded-xl mt-20 '>
                    <div className='flex justify-between mb-10'>
                        <Link to={`/Community/${cname}`}><SmallComm cname={cname} /></Link>
                        <Link to={`/Upload/${cname}`} className=''><button className='rounded-xl p-0 h-full w-fit font-bold pr-4 pl-4 text-3xl text-white border-white border-2 ml-60'>
                            +
                        </button></Link>
                        <button onClick={leaveCommunity} className='rounded-lg p-0 w-fit pr-4 pl-4 text-2xl text-white border-white border-2  transition-all ease-in-out delay-100 hover:bg-red-600'>
                            leave
                        </button>
                    </div>
                    <div className='flex p-6 mb-6 justify-between items-center'>
                        <div className='w-[50%]  flex justify-between'>
                            <button onClick={primeList} className='bg-black text-white tracking-wider rounded-3xl h-fit w-fit py-3 px-5 transition-all ease-in-out delay-100 hover:bg-purple-600' ref={prime}>
                                Prime
                            </button>
                            <button onClick={latestList} className='bg-black text-white tracking-wider rounded-3xl h-fit w-fit py-3 px-5 transition-all ease-in-out delay-100 hover:bg-purple-600' ref={latest}>
                                Latest
                            </button>
                            <button onClick={topList} className='bg-black text-white tracking-wider rounded-3xl h-fit w-fit py-3 px-5 transition-all ease-in-out delay-100 hover:bg-purple-600' ref={top}>
                                Popular
                            </button>
                        </div>
                        <div className='text-left flex flex-col w-fit text-white tracking-widest text-xl p-3 cursor-default'>
                            <div className='text-center font-bold'>
                                {members}
                            </div> <div className='text-sm font-light'>MEMBERS</div>
                        </div>
                    </div>

                    {result.map((result, index) => (
                        <div>
                            <div className='flex w-full justify-center mb-10'>
                                <App1 id={result.id} heading={result.heading} type={result.type} content={result.content} uploader={result.uploader}
                                    upvotes={result.upVote} downvotes={result.downVote} name={result.contentName} community={result.community} />
                            </div>
                        </div>
                    ))}

                </div>
            </>
        )
    }

    else {
        return (
            <>
                <div className='min-h-screen min-w-[45%] ml-10 p-4 bg-slate-50 bg-opacity-0 backdrop-blur-3xl rounded-xl mt-20 '>
                    <div className='flex justify-between mb-10'>
                        <Link to={`/Community/${cname}`}><SmallComm cname={cname} /></Link>
                        <button onClick={joinCommunity} className='rounded-lg p-0 w-fit pr-4 pl-4 text-2xl text-white border-white border-2  transition-all ease-in-out delay-100 hover:bg-green-600'>
                            Join
                        </button>
                    </div>
                    <div className='flex p-6 mb-6 justify-between items-center'>
                        <div className='w-[50%]  flex justify-between'>
                            <button onClick={primeList} className='bg-black text-white tracking-wider rounded-3xl h-fit w-fit py-3 px-5 transition-all ease-in-out delay-100 hover:bg-purple-600' ref={prime}>
                                Prime
                            </button>
                            <button onClick={latestList} className='bg-black text-white tracking-wider rounded-3xl h-fit w-fit py-3 px-5 transition-all ease-in-out delay-100 hover:bg-purple-600' ref={latest}>
                                Latest
                            </button>
                            <button onClick={topList} className='bg-black text-white tracking-wider rounded-3xl h-fit w-fit py-3 px-5 transition-all ease-in-out delay-100 hover:bg-purple-600' ref={top}>
                                Popular
                            </button>
                        </div>
                        <div className='text-left flex flex-col w-fit text-white tracking-widest text-xl p-3 cursor-default'>
                            <div className='text-center font-bold'>
                                {members}
                            </div> <div className='text-sm font-light'>MEMBERS</div>
                        </div>
                    </div>

                    {result.map((result, index) => (
                        <div>
                            <div className='flex w-full justify-center mb-10'>
                                <App1 id={result.id} heading={result.heading} type={result.type} content={result.content} uploader={result.uploader}
                                    upvotes={result.upVote} downvotes={result.downVote} name={result.contentName} community={result.community} />
                            </div>
                        </div>
                    ))}

                </div>
            </>
        )
    }
}

export default Community
