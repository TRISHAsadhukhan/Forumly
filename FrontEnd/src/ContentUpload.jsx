import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import UserContext from './Components/Context/UserContext';
import upload from './Upload2.png'
import Swal from 'sweetalert2';
const ContentUpload = () => {
  const navigate = useNavigate();
  const [type, setType] = useState('text');
  const [fileName, setfileName] = useState('');
  const [picture, setPicture] = useState(null);
  const [text, setText] = useState('');
  const [headingText, setHeadingText] = useState('')
  const [headingTextimg, setHeadingTextimg] = useState('')
  const textAreaRef = useRef(null);
  const headAreaRef = useRef(null);
  const headAreaimgRef = useRef(null);
  const { userName } = useContext(UserContext)
  const { cname } = useParams()

  const handleChange = (e) => {
    const textarea = textAreaRef.current;
    const headArea = headAreaRef.current;

    setText(textarea.value);
    setHeadingText(headArea.value);

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    headArea.style.height = 'auto';
    headArea.style.height = `${headArea.scrollHeight}px`;

  };

  const handleChangeimg = (e) => {
    const headAreaimg = headAreaimgRef.current
    setHeadingTextimg(headAreaimg.value);
    headAreaimg.style.height = 'auto';
    headAreaimg.style.height = `${headAreaimg.scrollHeight}px`;
  }
  useEffect(() => {
    if (userName == "null") {
      navigate("/login");
      window.location.reload();
    }
  }, [])
  const postImage = () => {
    const formData = new FormData();
    formData.append('file', picture);
    formData.append('heading', headingTextimg);
    formData.append('type', 'image');
    formData.append('uploader', userName);
    formData.append('community', cname);
    if (headingTextimg.length > 0 && picture) {
      fetch('http://127.0.0.1:8080/UploadImage', {
        method: 'POST',
        body: formData
      }).then(response => {
        if (response.ok) {
          navigate(`/Community/${cname}`)
        }
        else {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Oops...",
            text: "Wrong File Type!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
    }
    else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Oops...",
        text: "Some Fields are Empty!",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
  const postText = () => {
    if (headingText.length > 0 && text.length > 0) {
      fetch('http://127.0.0.1:8080/UploadText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ heading: headingText, content: text, uploader: userName, community: cname, type: "text" })
      }).then(response => {
        if (response.ok) {
          navigate(`/Community/${cname}`)
        }
        else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Oops...",
            text: "Some Fields are Empty!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
    }
    else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Oops...",
        text: "Some Fields are Empty!",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }


  if (type == 'text') {
    return (

      <div class="w-[500px] h-fit m-20 p-6 bg-slate-50 bg-opacity-0 backdrop-blur-3xl rounded-xl shadow-[0_35px_10px_-16px_rgba(0,0,0.3,.2)]">

        <div class="text-4xl font-bold text-center tracking-wide cursor-default text-slate-50 py-3 "> Upload Content</div>

        <div className="flex flex-col ">
          <div className="h-fit m-4 mt-7">
            <textarea id='textarea' className="w-full p-2 pl-3 rounded-2xl text-lg resize-none bg-gray-300 overflow-hidden  placeholder-slate-600 " rows="1" placeholder="Enter Your Heading" value={headingText} onChange={handleChange} ref={headAreaRef}></textarea>
          </div>

          <div className="h-fit mb-4 ml-4 mr-4">
            <textarea id='textarea' className="w-full p-2 pl-3 py-3 rounded-2xl text-lg resize-none overflow-hidden bg-gray-300 placeholder-slate-600" rows="5" placeholder="Upload your text here" value={text} onChange={handleChange} ref={textAreaRef}></textarea>
          </div>

          < div className='flex justify-between items-center mt-3 mb-7 px-6'>
            <button className='text-white  bg-black hover:bg-pink-600  font-bold py-2 px-8 rounded-full items-baseline  text-sm static- 5 transition ease-in-out delay-75hover:-translate-y-1 hover:scale-110  duration-300 ' onClick={() => { setType('image') }}>Image Upload</button>
            <button className='text-white   bg-black hover:bg-pink-600  font-bold py-2 px-10 rounded-lg text-right' onClick={postText}>post</button>
          </div>
        </div>
      </div>
    );
  }

  else {

    return (<>

      <div class="w-[500px] h-fit m-20 p-6 bg-slate-50 bg-opacity-0 backdrop-blur-3xl rounded-lg shadow-[0_35px_10px_-16px_rgba(0,0,0.3,.2)]">

        <div class="text-4xl font-bold text-center text-slate-50 cursor-default tracking-wide py-3"> Upload Content</div>

        <div className="flex flex-col">
          <div className="h-fit m-4 mt-7">
            <textarea id='textarea' className="w-full p-2 pl-3 rounded-2xl text-lg resize-none overflow-hidden bg-gray-300 placeholder-slate-600" rows="1" placeholder="Enter Your Heading" value={headingTextimg} onChange={handleChangeimg} ref={headAreaimgRef}></textarea>
          </div>

          <div className="h-fit m-4 mb-6 bg-gray-300 rounded-lg p-1 flex justify-between items-center">
            <input type="file" onChange={(e) => { setPicture(e.target.files[0]); setfileName(e.target.files[0].name) }}
              name="picture" id="picture" className='hidden' />
            <div className='flex items-center'>
              <label
                htmlFor="picture"
                className="cursor-pointer mr-2 ml-2 text-black py-2 rounded-lg"
              >
                <img src={upload} className='h-10 w-12 bg-transparent border-none' />

              </label>
              <span className="text-black">{fileName || 'No file chosen'}</span>
            </div>


            <button className="w-fit h-fit px-2 mr-2 bg-red-600 text-white rounded-full text-2xl border border-none
               hover:bg-pink-400 transition-all 
              duration-300 ease-in-out
            " onClick={() => {
                setPicture(null)
                document.getElementById("picture").value = null;
                setfileName('')
              }}>X</button>
          </div>

          < div className='flex justify-between items-center mt-3 mb-7 px-6'>

            <button className='text-white  bg-black hover:bg-pink-600  font-bold py-2 px-8 rounded-full items-baseline  text-sm static- 5 transition ease-in-out delay-75hover:-translate-y-1 hover:scale-110  duration-300 ' onClick={() => {
              setPicture(null)
              setType('text')
            }}>Text Upload</button>

            <button className='text-white  bg-black hover:bg-pink-600  font-bold py-2 px-10 rounded-lg text-right' onClick={postImage}>Post</button>
          </div>
        </div>
      </div>



    </>);

  }

}


export default ContentUpload;
