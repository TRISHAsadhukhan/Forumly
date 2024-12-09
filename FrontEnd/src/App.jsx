import { useState } from "react"

function reloads(){
  alert("Payment Successful")
  window.location.reload(true)
}
function App() {
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
                  "name": "Nigga Corp",
                  "description": "Test Transaction",
                  "image": "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
                  

                  "handler": function (data){
                  //alert(data.razorpay_payment_id);
                  //alert(data.razorpay_order_id);
                  //alert(data.razorpay_signature)
                  fetch('http://127.0.0.1:8080/PayDb', {
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({paymentId:data.razorpay_payment_id,name:"Trisha"})
                      
                    }).then(reloads()
                    
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
                  alert("Payment Failed");
                  /*alert(data.error.code);
                  alert(data.error.description);
                  alert(data.error.source);
                  alert(data.error.step);
                  alert(data.error.reason);
                  alert(data.error.metadata.order_id);
                  alert(data.error.metadata.payment_id);*/
                  });rzp1.open();
                  
                                      }
                                    
                                    }
                                      )
                                        
                                    
                                  }
  return (
    <>
     <button onClick={sendPay}>Place Order</button>
     <button onClick={()=>{window.location.reload(true)}}>Reload</button>
    </>
  )
}

export default App
