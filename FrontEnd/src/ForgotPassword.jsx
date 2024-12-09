import React, { useState } from 'react';
import {Link,NavLink,useNavigate} from 'react-router-dom'
    
function ForgotPassword(){
    const navigate = useNavigate();
    const [mail, setMail] = useState('');

    const sendMail=()=>{
        
    
    if(mail.length>1 && mail.indexOf('@')!=-1){
        document.getElementById('wrongemail').style.visibility='hidden'
        fetch('http://127.0.0.1:8080/sendmail?mail='+mail, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          
        }).then(response => {
            
            if(response.ok){
                alert("Mail sent")
                navigate('/Login')
            }
            else{
                alert("Mail does not exist")
            }
        }).catch(console.error())
        
        }
        else{
            document.getElementById('wrongemail').style.visibility='visible'
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
                    <input type="text" className="inputs" value={mail} onChange={(e) => setMail(e.target.value)} placeholder="Email" name="uname" id="uname"/>
                    <div className="wronginput" id="wrongemail">
                        email can not be blank
                    </div>
                </div>
            </div>
            <div className="button-container">
                <button className="button" onClick={sendMail}>Confirm</button>
            </div>
            
        </div>
        

    </div>
        </>
    )
        
  
}

export default ForgotPassword