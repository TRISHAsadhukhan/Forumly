import { useState , useContext,useEffect} from "react"
import {Link,NavLink,useNavigate} from 'react-router-dom'
import App1 from "./App1"
import UserContext from './Components/Context/UserContext';

function MyPosts() {
  const [result,setResult]=useState([])
  const {userName,newCom} = useContext(UserContext);
  useEffect(() => {
    if (userName == "null") {
        navigate("/login");
        window.location.reload();
    }
    else {
        fetch(`http://127.0.0.1:8080/MyPosts?uname=${userName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
            .then(data => {
              if(data){
                setResult(data)
              }
            })
    }
}, [])



  return (
    <>
     <div className="h-fit min-h-[30%] min-w-[40%] w-fit px-6 py-6   bg-slate-50 bg-opacity-0 backdrop-blur-3xl  rounded-xl mt-20 shadow-[0_35px_10px_-16px_rgba(0,0,0.3,.2)]">
        <div className="text-left mb-7 font-extrabold cursor-default text-3xl  text-white flex items-center">
            <p className="mr-3 ml-2">My Posts</p>
        </div>
        {result.map((result, index) => (
                <div>
                    <div className='flex w-full justify-center mb-10'>
                        <App1 id={result.id} heading={result.heading} type={result.type} content={result.content} uploader={result.uploader}
                        upvotes={result.upVote} downvotes={result.downVote} name={result.contentName} community={result.community}/>
                    </div>
                </div>
                ))}
     </div>
    </>
  )
}

export default MyPosts
