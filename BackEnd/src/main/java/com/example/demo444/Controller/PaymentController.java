package com.example.demo444.Controller;

import com.example.demo444.Model.Payment;
import com.example.demo444.Repo.PaymentRepo;
import com.example.demo444.Repo.UserRepo;
import com.example.demo444.Model.UserEntity;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class PaymentController {
    public static class PaymentData {
        private String paymentInfo;

        public String getPaymentInfo() {
            return paymentInfo;
        }

        public void setPaymentInfo(String paymentInfo) {
            this.paymentInfo = paymentInfo;
        }
    }
    @PostMapping("/Pay")
    public String createOrder(@RequestBody PaymentData paymentData) throws Exception{
        RazorpayClient rpc=new RazorpayClient("rzp_test_J4o77Y0gGt9VQK","MVeJXSPk6cF6NE5p99bcn9B0");
        String amt=paymentData.getPaymentInfo();
        int amount=Integer.parseInt(amt);
        JSONObject options = new JSONObject();
        options.put("amount", amount);
        options.put("currency", "INR");
        options.put("receipt", "txn_123456");
        Order order = rpc.orders.create(options);
        System.out.println(order);
        return order.toString();
    }
    @Autowired
    private UserRepo ur;
    public static class PaymentD{
        private String paymentId;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        private String name;

        public String getPaymentId() {
            return paymentId;
        }

        public void setPaymentId(String paymentId) {
            this.paymentId = paymentId;
        }
    }
    @Autowired
    PaymentRepo pr;

    @PutMapping("/PayDb")
    public ResponseEntity<Object> saveP(@RequestBody PaymentD paymentD){
        UserEntity u=ur.findByName(paymentD.getName());
        if(u!=null){
            u.setStatus("Prime");
            ur.save(u);
            Payment p=new Payment();
            p.setPaymentId(paymentD.getPaymentId());
            p.setUname(u.getName());
            pr.save(p);
            System.out.print(u.getStatus());
            return ResponseEntity.status(HttpStatus.OK).body("Successfully Paid");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Payment Failed");

    }

}
