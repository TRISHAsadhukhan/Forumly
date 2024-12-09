package com.example.demo444.Controller;

import com.example.demo444.Model.*;
import com.example.demo444.Repo.CommentRepo;
import com.example.demo444.Repo.ContentRepo;
import com.example.demo444.Repo.LikesRepo;
import com.example.demo444.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class CommentController {
    @Autowired
    private ContentRepo conr;
    @Autowired
    private UserRepo ur;
    @Autowired
    private LikesRepo lr;
    @Autowired
    private CommentRepo cmr;


    @PostMapping("/CommentPost")
    public ResponseEntity<Object> commentPost(@RequestBody CommentEntity cme){
        ContentEntity cnt=conr.findById(cme.getConid());
        UserEntity u=ur.findByName(cme.getUname());
        if(u!=null && cnt!=null){
            cme.setLikes(0);
            cmr.save(cme);
            return ResponseEntity.status(HttpStatus.OK).body("Comment Posted");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cannot Post Comment");

    }

    @PutMapping("/Like")
    public ResponseEntity<Object> like(@RequestBody Likes likes){
        CommentEntity commentEntity=cmr.findById(likes.getCommid());
        UserEntity u=ur.findByName(likes.getUname());
        if(u!=null && commentEntity!=null){
            int like=commentEntity.getLikes();
            Likes likes1=lr.findByUnameAndCommid(likes.getUname(), likes.getCommid());
            if(likes1!=null){
                like-=1;
                commentEntity.setLikes(like);
                cmr.save(commentEntity);
                lr.deleteById(likes1.getId());
                return ResponseEntity.status(HttpStatus.OK).body("Like Removed");
            }
            else {
                like+=1;
                commentEntity.setLikes(like);
                cmr.save(commentEntity);
                lr.save(likes);
                return ResponseEntity.status(HttpStatus.OK).body("Like Added");
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can not Like");

    }
    @GetMapping("/IsLiked")
    public String isLiked(@RequestParam String uname, @RequestParam long comid){
        Likes l=lr.findByUnameAndCommid(uname,comid);
        if(l!=null){
            return "true";
        }
        return "false";

    }
    @GetMapping("/LatestComm")
    public ArrayList<CommentEntity> latestComm(@RequestParam long conid){
        ArrayList<CommentEntity> latestList=cmr.findAllByConid(conid);
        return latestList;

    }
    @GetMapping("/PopularComm")
    public ArrayList<CommentEntity> popularComm(@RequestParam long conid){
        ArrayList<CommentEntity> popular=cmr.findAllByConidPopular(conid);
        return popular;

    }
    @GetMapping("/PrimeComm")
    public ArrayList<CommentEntity> primeComm(@RequestParam long conid){
        ArrayList<CommentEntity> primeComm=cmr.findAllByStatus(conid);
        return primeComm;

    }
    @GetMapping("/GetComment")
    public CommentEntity GetComment(@RequestParam long comid){
        CommentEntity comm=cmr.findById(comid);
        return comm;

    }

}
