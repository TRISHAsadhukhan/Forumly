import React, { useState, useContext, useEffect } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import UserContext from './Components/Context/UserContext';
import Swal from 'sweetalert2';
function Admin() {
    const navigate = useNavigate();
    const { userName, status } = useContext(UserContext)
    const [results, setResults] = useState([])
    const [resolved, setResolved] = useState('true')
    useEffect(() => {
        if (status != "admin") {
            navigate("/");
            window.location.reload();
        }
        else {
            fetch(`http://127.0.0.1:8080/GetReport`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(response => response.json())
                .then(data => {
                    setResults(data)
                })
        }
    }, [resolved])
    function resolve(resolveid) {
        fetch(`http://127.0.0.1:8080/Resolve?conid=${resolveid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            if (response.ok) {
                if (resolved == 'true') {
                    setResolved('false')
                    Swal.fire({
                        title: "Resolved!",
                        text: "Report has been resolved.",
                        icon: "success",
                        timer: 2000
                    });
                }
                else {
                    setResolved('true')
                    Swal.fire({
                        title: "Deleted!",
                        text: "Report has been deleted.",
                        icon: "success",
                        timer: 2000

                    });
                }
            }
        })
    }
    return (
        <div className='w-[80%] flex justify-end'>
        <div className='min-h-screen h-fit w-[70%] mr-20 ml-24 bg-slate-50 bg-opacity-0 backdrop-blur-3xl rounded-2xl p-20 pb-0 shadow-[0_35px_10px_-16px_rgba(0,0,0.3,.2)] mt-20'>
            <div className="text-slate-50 tracking-widest text-4xl font-extrabold p-5 mb-8">Reports !!!</div>
            {results.map((result, index) => (
                <div>
                    <div className='flex justify-start h-fit w-full mb-10 items-center'>
                    <div className='flex bg-black w-[65%] justify-start rounded-full py-3 mr-12 transition-all ease-in-out delay-100 hover:bg-gray-500'>  
                    <Link to={`/Content/${result.cn.id}`}><div className='ml-2 h-10 w-10 text-black rounded-[50%] flex justify-center items-center cursor-pointer mr-2 bg-white  p-6 text-lg font-bold'>{result.reports}</div></Link>
                        <Link to={`/Content/${result.cn.id}`}><div className='min-w-fit h-10 w-80 flex justify-start items-center rounded-3xl cursor-pointer  transition-all ease-in-out delay-100 mr-6 text-white p-6 text-sm font-extralight'>{result.cn.heading}</div></Link></div>
                        <div className='h-fit w-fit inline-block'><button className='h-14 w-14 bg-gradient-to-r from-red-600 to-pink-600 rounded-full flex justify-center items-center cursor-pointer hover:bg-gradient-to-l hover:from-red-400 hover:to-pink-400 transition-all 
                        duration-300 text-white text-2xl font-extrabold' onClick={() => { resolve(result.cn.id) }}>X</button></div>
                    </div>
                </div>

            ))}
        </div>
        </div>
    )
}

export default Admin