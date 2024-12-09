package com.example.demo444.Controller;

import com.example.demo444.Model.CommunityEntity;
import com.example.demo444.Model.ContentEntity;
import com.example.demo444.Model.Member;
import com.example.demo444.Repo.CommunityRepo;
import com.example.demo444.Repo.MembersRepo;
import com.example.demo444.Repo.UserRepo;
import com.example.demo444.Model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class Community {
    @Autowired
    private CommunityRepo cr;
    @Autowired
    private UserRepo ur;
    @Autowired
    private MembersRepo mr;
    @PostMapping("/CreateComm")
    public ResponseEntity<Object> createCommunity(@RequestBody CommunityEntity ce){

        UserEntity u=ur.findByName(ce.getUsername());

        if(u!=null){
            String status=u.getStatus();
            if(status.equals("Prime") || status.equals("Admin")){
            ce.setMember_count(1);
            cr.save(ce);
            return ResponseEntity.status(HttpStatus.OK).body("Community created");
        }}
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can not create community");

    }
    @PutMapping("/AddMember")
    public ResponseEntity<Object> addMember(@RequestBody Member member){
        UserEntity u=ur.findByName(member.getUname());
        CommunityEntity cm=cr.findByCommunityname(member.getCname());
        if(u!=null && cm!=null){
            Member m=mr.findByUnameAndCname(u.getName(),cm.getCommunityname());
            if(m==null && !cm.getUsername().equals(u.getName())){
                Member m1=new Member();
                m1.setUname(u.getName());
                m1.setCname(cm.getCommunityname());
                mr.save(m1);
                int memberCount=cm.getMember_count()+1;
                cm.setMember_count(memberCount);
                cr.save(cm);
                return ResponseEntity.status(HttpStatus.OK).body("Member Joined");
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can not Join");

    }
    @PutMapping("/RemoveMember")
    public ResponseEntity<Object> removeMember(@RequestBody Member member){
        UserEntity u=ur.findByName(member.getUname());
        CommunityEntity cm=cr.findByCommunityname(member.getCname());
        if(u!=null && cm!=null){
            Member m=mr.findByUnameAndCname(u.getName(),cm.getCommunityname());
            if(m!=null){
                mr.deleteById(m.getId());
                int memberCount=cm.getMember_count()-1;
                cm.setMember_count(memberCount);
                cr.save(cm);
                return ResponseEntity.status(HttpStatus.OK).body("Member Removed");
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can not Remove");

    }
    @GetMapping("/SearchComm")
    public ArrayList<CommunityEntity> searchComm(@RequestParam String query){
        String finalQuery=query.trim();
        ArrayList<CommunityEntity> al=new ArrayList<CommunityEntity>();
        if(query.length()<=3){
            al=cr.searchSmall(finalQuery);
        }
        else{
            al=cr.searchLarge(finalQuery);
        }
        return al;

    }
    @GetMapping("/SearchTags")
    public ArrayList<CommunityEntity> searchTags(@RequestParam String query){
        String finalQuery=query.trim();
        ArrayList<CommunityEntity> al=new ArrayList<CommunityEntity>();
        al=cr.searchTag();
        ArrayList<CommunityEntity> resultList=new ArrayList<CommunityEntity>();
        for (CommunityEntity cm : al)
        {   String tags=cm.getTags();
            String[] tagsArr = tags.split(",");
            boolean flag=false;
            for(int i=0;i<tagsArr.length;i++){
                if(tagsArr[i].equalsIgnoreCase(finalQuery)){
                    flag=true;
                    break;
                }
            }
            if(flag){
                resultList.add(cm);
            }
        }

        return resultList;

    }
    @GetMapping("/IsMember")
    public ResponseEntity<Object> isMember(@RequestParam String uname, @RequestParam String cname){
        Member m=mr.findByUnameAndCname(uname,cname);
        if(m!=null){
            return ResponseEntity.ok("true");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("false");

    }
    @GetMapping("/IsCreator")
    public ResponseEntity<Object> isCreator(@RequestParam String uname, @RequestParam String cname){
        CommunityEntity popularList=cr.findByUsernameAndCommunityname(uname,cname);
        if(popularList!=null){
            return ResponseEntity.ok("true");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("false");

    }
    @GetMapping("/SearchTopComm")
    public ArrayList<CommunityEntity> searchTopComm(){

        ArrayList<CommunityEntity> al=new ArrayList<CommunityEntity>();
        al=cr.topCommunity();
        return al;

    }
    @GetMapping("/CommunityDetails")
    public CommunityEntity communityDetails(@RequestParam String cname){

        CommunityEntity ce=cr.findByCommunityname(cname);

        return ce;

    }
    @GetMapping("/MyComm")
    public ArrayList<CommunityEntity> myComm(@RequestParam String username){
        ArrayList<CommunityEntity> al=new ArrayList<CommunityEntity>();
        al=cr.myComm(username);
        return al;
    }

    @GetMapping("/MyCommAll")
    public ArrayList<CommunityEntity> myCommAll(@RequestParam String username){
        ArrayList<CommunityEntity> al=new ArrayList<CommunityEntity>();
        al=cr.myCommAll(username);
        return al;
    }



}
