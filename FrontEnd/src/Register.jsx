import React, { useState ,useContext} from 'react';
import {Link,NavLink,useNavigate} from 'react-router-dom'
import UserContext from './Components/Context/UserContext';
import Swal from 'sweetalert2';
    
function Register(){
    const navigate = useNavigate();
    const {setUserName, setStatus, setAvatar } = useContext(UserContext);
    const [usernames, setUsernames] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const clearError=()=>{
        if(usernames==''){
            document.getElementById("wrongname").style.visibility = 'visible';
        }
        else{
            document.getElementById("wrongname").style.visibility = 'hidden';
        }
        if(email==''){
            document.getElementById("wrongemail").style.visibility = 'visible';
        }
        else if(!email.includes('@') || email.length<3){
            document.getElementById("wrongemail").innerHTML='invalid Email';
            document.getElementById("wrongemail").style.visibility = 'visible';
        }
        else{
            document.getElementById("wrongemail").style.visibility = 'hidden';
        }
        if(password==''){
            document.getElementById("wrongpass").innerHTML='password can not be blank';
            document.getElementById("wrongpass").style.visibility = 'visible';
        }
        else if(password.length<11){
            document.getElementById("wrongpass").innerHTML='Atleast 10 characters required';
            document.getElementById("wrongpass").style.visibility = 'visible';
        }
        else{
            document.getElementById("wrongpass").style.visibility = 'hidden';
        }
        if(confirmPassword==''){
            document.getElementById("wrongcpass").style.visibility = 'visible';
        }
        if(confirmPassword!=password){
            document.getElementById("wrongcpass").innerHTML='Passwords do not match';
            document.getElementById("wrongcpass").style.visibility = 'visible';
        }
        else{
            document.getElementById("wrongcpass").style.visibility = 'hidden';
        }
        
        if(usernames!='' && email!='' && email.includes('@') && email.length>3 && password!='' && confirmPassword!='' && confirmPassword==password && password.length>10){
            document.getElementById("wrongcpass").style.visibility = 'hidden';
            document.getElementById("wrongemail").style.visibility = 'hidden';
            document.getElementById("wrongname").style.visibility = 'hidden';
            fetch('http://127.0.0.1:8080/signUp', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({name:usernames,email:email,password:password})
          
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
                // alert("Email or Usernames is already in use")
                Swal.fire({
                    title: "Invalid!",
                    text: "Email or Usernames is already in use.",
                    icon: "error"
                  });
            }
        }).catch(error=>{console.error()
        // alert("Email or Usernames is already in use")
        Swal.fire({
            title: "Invalid!",
            text: "Email or Usernames is already in use.",
            icon: "error"
          });
            
    }

    )
        
        }
        
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
                <button className="login" id="reg-opt"  >
                <Link to="/login" className='link'> Login</Link>
                    </button>
                    <button className="register" id="log-opt" >
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
                    <input type="text" className="inputs" 
                    value={usernames} onChange={(e) => setUsernames(e.target.value)} placeholder="UserName" name="uname" id="uname"/>
                    <div className="wronginput" id="wrongname">
                        Usernames can not be blank
                    </div>
                    <input type="email" className="inputs" placeholder="Enter Email" name="uemail" id="uemail"
                    value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <div className="wronginput" id="wrongemail">
                            Email can not be blank
                    </div>
                    <input type="password" className="inputs" placeholder="Enter Password" name="upass" id="upass"
                    value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <div className="wronginput" id="wrongpass">
                            password can not be blank
                    </div>
                    <input type="password" className="inputs" placeholder="Confirm Password" name="cpass" id="cpass"
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    <div className="wronginput" id="wrongcpass">
                            password can not be blank
                    </div>
                    <div className="forgot-container">
                        
                    </div>
                    
                </div>
            </div>
            <div className="button-container">
                <button className="button" onClick={clearError}>Sign up</button>
            </div>
            
        </div>
        

    </div>
    </>
    )
        
  
}

export default Register