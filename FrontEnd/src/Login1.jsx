import React, { useState ,useContext} from 'react';
import {Link,NavLink,useNavigate} from 'react-router-dom'
import UserContext from './Components/Context/UserContext';
import Swal from 'sweetalert2';
function Login1(){
    const navigate = useNavigate();
    const {setUserName, setStatus, setAvatar } = useContext(UserContext);
    const [usernames, setUsernames] = useState('');
    const [password, setPassword] = useState('');
    const clearError=()=>{
        fetch('http://127.0.0.1:8080/signIn', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({name:usernames,password:password})
          
        }).then(response => response.json())
        .then(data => {
            
            if(data){
                setUserName(data.name)
                setAvatar(data.avatar)
                setStatus(data.status)
                window.location.href = "http://localhost:5173/";
                //console.log(data)
            }
            else{
                // alert("Wrong username or Password")
                Swal.fire({
                    title: "Invalid!",
                    text: "Wrong username or Password.",
                    icon: "error"
                  });
                  navigate('/AdminReport')
            }
        }).catch(error=>{console.error()
        // alert("Wrong username or Password")
        Swal.fire({
            title: "Invalid!",
            text: "Wrong username or Password.",
            icon: "error"
          });}
    )

    }
    const handleSubmit=(e)=>{
        e.preventDefault();
    }
    return(
        <>
        <div className="Background-container">
        <img src="src/loginback.jpg" className="back-img"/>
    </div>
    <div className="login-box-container">
        <div className="loginbox" id="log-reg">
            <div className="login-reg-option">
                <div className="login-reg">
                <button className="login" id="log-opt"  >
                <Link to="/login" className='link'> Login</Link>
                    </button>
                    <button className="register" id="reg-opt" >
                    <Link to="/register" className='link'>Register</Link>
                    </button>
                </div>
            </div>
            <div className="logo-container">
                <img src="src/logo.png" id="Google-logo"/>
            </div>
            <br/>
            <div className="inputscon-flex">
                <div className="inputscon">
                    <input type="text" className="inputs" value={usernames} onChange={(e) => setUsernames(e.target.value)} placeholder="UserName" name="uname" id="uname"/>
                    <div className="wronginput" id="wrongname">
                        Username can not be blank
                    </div>
                    <input type="password" className="inputs" placeholder="Enter Password" name="upass" id="upass" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <div className="wronginput" id="wrongpass">
                        password can not be blank
                    </div>
                    <div className="forgot-container">
                        <Link to="/ForgotPassword" id="forgot-pass">
                            Forgot Password?
                        </Link>
                    </div>
                    
                </div>
            </div>
            <div className="button-container">
                <button className="button" onClick={clearError}>Login</button>
            </div>
            
        </div>
        

    </div>
        </>
    )
        
  
}

export default Login1