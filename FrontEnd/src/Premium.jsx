import { useState ,useContext,useEffect} from "react"
import {Link,NavLink,useNavigate} from 'react-router-dom'
import UserContext from "./Components/Context/UserContext"


function Premium() {
  const {userName}=useContext(UserContext)
  const {status}=useContext(UserContext)
  const {setStatus}=useContext(UserContext)
  const navigate = useNavigate();
  useEffect(() => {
    if(status=="Prime"){
      navigate("/NewComm")
    }
  },[status])
  let  sendPay=() =>{

    fetch('http://127.0.0.1:8080/Pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({paymentInfo:"90000"})
      
    }).then(response => response.json())
      .then(data => {
      if (data.status=='created'){
        console.log(data)
        var options = {
                  "key": "rzp_test_J4o77Y0gGt9VQK", 
                  "amount": data.amount, 

                  "currency": "INR",
                  "name": "forumly",
                  "description": "Premium",
                  "image": "src/logo.png",
                  "handler": function (data){
                  fetch('http://127.0.0.1:8080/PayDb', {
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({paymentId:data.razorpay_payment_id,name:userName})
                      
                    }).then(//reloads(status)
                    ()=>
                      {
                        // alert("Payment Successful")
                        //window.location.reload(true)
                       
                        setStatus("Prime")
                        console.log(status)
                      }
                    )
                  
                  },
                  prefill: {
                  name: "",
                  email: "",
                  contact: ""
                  },
                  notes: {
                  address: "Razorpay Corporate Office"

                  },
                  theme: {
                  color: "#3399cc"
                  }
                  };
                  var rzp1 = new Razorpay(options);
                  rzp1.on('payment.failed', function (data){
                  // alert("Payment Failed");
                 
                  
                  });rzp1.open();
                  
                                      }
                                    
                                    }
                                      )
                                        
                                    
                                  }
  return (
    <>
    <div className="bg-slate-50 bg-opacity-0 backdrop-blur-3xl rounded-3xl p-20 pt-24 pb-24 ml-6 shadow-[0_35px_10px_-16px_rgba(0,0,0.3,.2)]">
        <div className="flex justify-center ">
            <img src="src/crown1.png" className="h-40 w-40 bg-re" />
        </div>
        <div className="text-xl font-extrabold text-center tracking-wide p-4 pt-2 pb-0 text-slate-50">
            Buy Premium to Create Community And Get More 
        </div>
        <div className="text-xl font-extrabold text-center tracking-wide p-4 pt-0 mb-5 text-slate-50">
            Benifits!!
        </div>
        <div className="flex justify-center">
            <button className="bg-purple-600 text-xl text-white p-4 pr-6 pl-6 rounded-xl transition-all ease-in-out delay-100 hover:bg-yellow-500 shadow-[0_35px_80px_-16px_rgba(0,0,0.3)]" onClick={sendPay}>Buy Now</button>
        </div>
        
    </div>
     
    </>
  )
}

export default Premium
