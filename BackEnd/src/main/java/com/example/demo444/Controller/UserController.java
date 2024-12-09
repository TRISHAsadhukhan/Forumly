package com.example.demo444.Controller;


import com.example.demo444.Services.EmailSenderService;
import com.example.demo444.Repo.UserRepo;
import com.example.demo444.Model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class UserController {

    @Autowired
    private UserRepo userrepo;
    @PostMapping("/signUp")
    public ResponseEntity<Object> signUp(@RequestBody UserEntity user){
        UserEntity u=userrepo.findByNameOrEmail(user.getName(),user.getEmail());
        if(u!=null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User Already Exists");
        }
        user.setStatus("free");
        user.setAvatar("avatar2.png");
        userrepo.save(user);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }
    @PutMapping("updateAvatar/{name}/{newAvatar}")
    public ResponseEntity<Object> updateAvatar(@PathVariable String name, @PathVariable String newAvatar) {
        UserEntity optionalUser = userrepo.findByName(String.valueOf(name));
        if (optionalUser!=null) {
            optionalUser.setAvatar(newAvatar);
            userrepo.save(optionalUser);
            return ResponseEntity.ok("Avatar updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found " );
        }
    }
    @Autowired
    private EmailSenderService senderService;
    @GetMapping("/sendmail")
    public ResponseEntity<Object> sendMailTO(@RequestParam("mail") String mail) {
        UserEntity u=new UserEntity();
        u=userrepo.findByEmail(mail);
        if(u==null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("can not find user");
        }
        String pass=u.getPassword();
        senderService.sendEmail(mail, "Check your Password", "Username is:- "+u.getName()+"\nPassword is:- "+pass);
        return ResponseEntity.status(HttpStatus.OK).body("Mail sent");
    }
    @PostMapping("/signIn")
    public ResponseEntity<Object> signIn(@RequestBody UserEntity user){
        UserEntity u=userrepo.findByNamesAndPasswords(user.getName(),user.getPassword());
        if(u==null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User Does Not Exist");
        }
        return ResponseEntity.status(HttpStatus.OK).body(u);
    }
    @GetMapping("/GetAvatar")
    public String getAvatar(@RequestParam String uname){
        UserEntity u=userrepo.findByName(uname);
        return u.getAvatar();
    }

}
