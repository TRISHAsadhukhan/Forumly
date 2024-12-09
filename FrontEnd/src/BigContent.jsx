import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import UserContext from './Components/Context/UserContext';
import Comment from './Comment.jsx';
import Content from './Content.jsx';

function BigContent() {
  const { avatar } = useContext(UserContext);
  const [commenting, setCommenting] = useState('false')
  const textAreaRef = useRef(null);
  const [text, setText] = useState('');
  const { id } = useParams()
  const [results, setResults] = useState([])
  const { userName, status } = useContext(UserContext)
  const top = useRef()
  const prime = useRef()
  const latest = useRef()


  const handleChange = (e) => {
    const textarea = textAreaRef.current;
    setText(textarea.value);
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };
  const postComm = (e) => {
    if (text.length > 0) {
      fetch(`http://127.0.0.1:8080/CommentPost`, {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ conid: id, uname: userName, comment: text })
      }).then(response => {
        if (response.ok) {
          if (commenting == 'true') {
            setCommenting('false')

          }
          else {
            setCommenting('true')

          }
        }

      })
      setText('')
      document.getElementById('textarea').style.height = 'auto';
    }


  }
  const premiumComm = () => {
    top.current.style.backgroundColor = "rgba(76, 29, 149, 0.3)";
    prime.current.style.backgroundColor = "#9333EA";
    latest.current.style.backgroundColor = "rgba(76, 29, 149, 0.3)";
    fetch(`http://127.0.0.1:8080/PrimeComm?conid=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
      .then(data => {
        setResults(data)
        console.log(data)
      })
  }
  const topComm = () => {
    top.current.style.backgroundColor = "#9333EA";
    prime.current.style.backgroundColor = "rgba(76, 29, 149, 0.3)";
    latest.current.style.backgroundColor = "rgba(76, 29, 149, 0.3)";
    fetch(`http://127.0.0.1:8080/PopularComm?conid=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
      .then(data => {
        setResults(data)
        console.log(data)

      })
  }
  const latestComm = () => {
    top.current.style.backgroundColor = "rgba(76, 29, 149, 0.3)";
    prime.current.style.backgroundColor = "rgba(76, 29, 149, 0.3)";
    latest.current.style.backgroundColor = "#9333EA";
    fetch(`http://127.0.0.1:8080/LatestComm?conid=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
      .then(data => {
        setResults(data)
        console.log(data)
      })
  }
  useEffect(() => {
    if (userName == "null") {
      navigate("/login");
      window.location.reload();
    }
    else {
      fetch(`http://127.0.0.1:8080/LatestComm?conid=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(response => response.json())
        .then(data1 => {
          setResults(data1)
          console.log(data)
        })
    }
  }, [id, commenting])
  if (status != 'admin') {
    return (
      <>
        <div className='bg-slate-50 bg-opacity-0 backdrop-blur-3xl  w-[40%] ml-12 min-h-[60%] h-fit p-4 mt-20 rounded-lg'>
          <Content />
          <>
            <div className="flex justify-center items-start w-full mb-10 ">

              <div className=" h-fit w-full bg-purple-800 flex items-center justify-between px-5 rounded-2xl">

                <div className=" flex  flex-col items-center justify-center">
                  <div className="w-full h-full flex justify-center mt-6">
                    <img src={`http://localhost:8080/Avatars/${avatar}`} className=" h-10 w-10 bg-white rounded-full" />
                  </div>
                  <div className=" w-fit mb-3 flex items-center justify-evenly text-gray-200 text-sm font-bold">
                    {userName}
                  </div>
                </div>

                <div className="h-fit mt-2">
                  <textarea id='textarea' className="w-[28rem] p-2 pl-5 ml-3 rounded-2xl text-sm resize-none overflow-hidden" rows="1" placeholder="Add Your Comment" value={text} onChange={handleChange} ref={textAreaRef}></textarea>
                </div>

                <button onClick={postComm} className='w-12 h-9 bg-black p-2 rounded-md text-white text-center ml-2 text-sm hover:bg-pink-600 active:outline-none'>Post</button>
              </div>

            </div>
          </>
          <div className='flex justify-start my-10 w-full'>
            <button onClick={premiumComm} className='bg-purple-800 bg-opacity-30  text-white tracking-wider rounded-3xl text-xs h-fit w-fit py-2 px-3 mr-3 transition-all ease-in-out delay-100 hover:bg-purple-600' ref={prime}>
              Premium
            </button>
            <button onClick={latestComm} className='bg-purple-800 bg-opacity-30  text-white tracking-wider rounded-3xl text-xs h-fit w-fit py-2 px-3 mr-3 transition-all ease-in-out delay-100 hover:bg-purple-600' ref={latest}>
              Latest
            </button>
            <button onClick={topComm} className='bg-purple-800 bg-opacity-30  text-white tracking-wider rounded-3xl text-xs h-fit w-fit py-2 px-3 mr-3 transition-all ease-in-out delay-100 hover:bg-purple-600' ref={top}>
              Popular
            </button>
          </div>

          {results.map((result, index) => (
            <Comment key={result.id} comid={result.id} uname={result.uname} />))}



        </div>

      </>
    )
  }
  else {
    return (
      <>
        <div className='bg-slate-50 bg-opacity-0 backdrop-blur-3xl w-[40%] ml-12 min-h-[60%] h-fit p-2 mt-20 rounded-lg'>
          <Content />
        </div>

      </>
    )
  }
}


export default BigContent
