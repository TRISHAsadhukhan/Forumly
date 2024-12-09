import React, { useState, useContext, useEffect } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import UserContext from './Components/Context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

function Comment({comid,uname}) {
  const [commentator,setCommentator]=useState("")
  const [comment,setComment]=useState("")
  const [likes,setLikes]=useState("")
  const [liked,setLiked]=useState('false')
  const [avatars,setAatars]=useState("")
  const [liking,setLiking]=useState("false")
  const {userName}=useContext(UserContext)
  const changeLike=()=>{
    fetch(`http://127.0.0.1:8080/Like`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({uname:userName,commid:comid})
            }).then(response => {
                if(response.ok){
                    if(liking=="true"){
                      setLiking("false")
                    }
                    else{
                      setLiking("true")
                    }
                }
                
            })
  }
  useEffect(() => { 
        fetch(`http://127.0.0.1:8080/GetComment?comid=${comid}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            },
        }).then(response => response.json())
            .then(data => {
                setComment(data.comment)
                setCommentator(data.uname)
                setLikes(data.likes)
                
            }) 
        fetch(`http://127.0.0.1:8080/GetAvatar?uname=${uname}`, {
              method: 'GET',
              headers: {
              'Content-Type': 'application/json'
              },}).then(responses => responses.text())
              .then(datas => {
                setAatars(datas)
              })
        fetch(`http://127.0.0.1:8080/IsLiked?uname=${userName}&comid=${comid}`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'
                },}).then(responses => responses.text())
                .then(datas => {
                  if(datas=='true'){
                    setLiked('true')
                  }
                  else if(datas=='false'){
                    setLiked('false')
                  }
                })
        },[liking])
  return (
    <div className='h-fit min-h-20 w-full px-4 py-2 bg-purple-800 rounded-3xl mb-4'>
      <div className='h-fit w-fit inline-block mb-4'>
        <img src={`http://localhost:8080/Avatars/${avatars}`} alt="User Avatar" className='w-12 h-12 border-solid border-2 border-white bg-white rounded-full p-0 mr-4 inline-block'/>
        <div className='inline-block text-sm text-yellow-100 tracking-widest font-bold cursor-default'>{commentator}</div>
      </div>
      <div className='flex justify-between'>
        <div className='p-2 whitespace-pre-line text-white'>
          <pre className='text-lg '>{comment}</pre>
        </div>
        <div className='pr-2 w-fit'>
          <div className='flex justify-center'> 
            <button onClick={changeLike}>{liked==='true' ? (
            <FontAwesomeIcon icon={faHeart} className='text-pink-600 h-6 w-6 cursor-pointer' />
              ):(<FontAwesomeIcon icon={faHeart} className='text-white h-6 w-6 cursor-pointer' />)}
            </button>
          </div>
          <div className='text-white p-2'>{likes} likes</div>
        </div>
      </div>
      
    </div>
  );
}

export default Comment;