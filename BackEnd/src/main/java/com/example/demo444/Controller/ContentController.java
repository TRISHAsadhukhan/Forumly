package com.example.demo444.Controller;

import com.example.demo444.Model.*;
import com.example.demo444.Repo.*;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collections;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ContentController {
    @Autowired
    private CommunityRepo cr;
    @Autowired
    private UserRepo ur;
    @Autowired
    private MembersRepo mr;
    @Autowired
    private ContentRepo conr;
    @Autowired
    private UpvoteRepo uvr;
    @Autowired
    private DownvoteRepo dvr;
    @Autowired
    private CommentRepo cmr;
    @Autowired
    private LikesRepo like;

    @PostMapping("/UploadText")
    public ResponseEntity<Object> uploadText(@RequestBody ContentEntity ce){
        CommunityEntity cm=cr.findByUsernameAndCommunityname(ce.getUploader(),ce.getCommunity());
        Member m1=mr.findByUnameAndCname(ce.getUploader(),ce.getCommunity());
        String type=ce.getType();
        if((m1!=null || cm!=null) && type.equalsIgnoreCase("text")){
            ce.setDownVote(0);
            ce.setUpVote(0);
            conr.save(ce);
            return ResponseEntity.status(HttpStatus.OK).body("Content Posted");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cannot Post Content");

    }
    @PostMapping("/UploadImage")
    public ResponseEntity<Object> uploadImage(@NotNull @RequestParam("file") MultipartFile file,
                                              @NotNull @RequestParam("heading") String heading,
                                              @NotNull @RequestParam("type") String type,
                                              @NotNull @RequestParam("uploader") String uploader,
                                              @NotNull @RequestParam("community") String community){
        String extension = "";
        String fileName=file.getOriginalFilename();
        int i = fileName.lastIndexOf('.');
        if (i >= 0) { extension = fileName.substring(i+1); }
        if(extension.equalsIgnoreCase("jpg")||extension.equalsIgnoreCase("jpeg")||extension.equalsIgnoreCase("png")){

        CommunityEntity cm=cr.findByUsernameAndCommunityname(uploader,community);
        Member m1=mr.findByUnameAndCname(uploader,community);
        if((m1!=null || cm!=null) && type.equalsIgnoreCase("image")){
            ContentEntity cone=new ContentEntity();
            cone.setDownVote(0);
            cone.setUpVote(0);
            cone.setUploader(uploader);
            cone.setCommunity(community);
            cone.setType("image");
            String currentDirectory = System.getProperty("user.dir");
            String path=currentDirectory+"\\src\\main\\webapp\\images";
            try{
                InputStream is=file.getInputStream();
                byte []data=new byte[is.available()];
                is.read(data);
                FileOutputStream fos=new FileOutputStream(path+ File.separator+fileName);
                fos.write(data);
                fos.close();
            }
            catch(Exception e){
                System.out.println(e);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cannot Post Content");
            }
            cone.setContentName(file.getOriginalFilename());
            cone.setHeading(heading);
            cone.setContent("/images/"+file.getOriginalFilename());
            conr.save(cone);
            return ResponseEntity.status(HttpStatus.OK).body("Content Posted");

        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cannot Post Content");}
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cannot Post Content");

    }
    @PutMapping("/Upvote")
    public ResponseEntity<Object> upvote(@RequestBody Upvote up){
        UserEntity un=ur.findByName(up.getUname());
        ContentEntity contentEntity=conr.findById(up.getContid());
        if(un!=null && contentEntity!=null){
            Upvote upvote=uvr.findByUnameAndContid(up.getUname(),up.getContid());
            Downvote downvote=dvr.findByUnameAndContid(up.getUname(),up.getContid());
            int dVote=contentEntity.getDownVote();
            int uVote=contentEntity.getUpVote();
            if(upvote!=null){
                uVote=uVote-1;
                contentEntity.setUpVote(uVote);
                conr.save(contentEntity);
                uvr.deleteById(upvote.getId());
                return ResponseEntity.status(HttpStatus.OK).body("Upvote Removed");
            }
            else if(downvote!=null){
                uVote=uVote+1;
                dVote=dVote-1;
                contentEntity.setUpVote(uVote);
                contentEntity.setDownVote(dVote);
                conr.save(contentEntity);
                dvr.deleteById(downvote.getId());
                uvr.save(up);
                return ResponseEntity.status(HttpStatus.OK).body("Upvote Added");
            }
            else{
                uVote=uVote+1;
                contentEntity.setUpVote(uVote);
                conr.save(contentEntity);
                uvr.save(up);
                return ResponseEntity.status(HttpStatus.OK).body("Upvote Added");
            }

        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cannot vote");

    }
    @PutMapping("/Downvote")
    public ResponseEntity<Object> downvote(@RequestBody Downvote dw){
        UserEntity un=ur.findByName(dw.getUname());
        ContentEntity contentEntity=conr.findById(dw.getContid());
        if(un!=null && contentEntity!=null){
            Downvote downvote=dvr.findByUnameAndContid(dw.getUname(),dw.getContid());
            Upvote upvote=uvr.findByUnameAndContid(dw.getUname(),dw.getContid());
            int dVote=contentEntity.getDownVote();
            int uVote=contentEntity.getUpVote();
            if(downvote!=null){
                dVote=dVote-1;
                contentEntity.setDownVote(dVote);
                conr.save(contentEntity);
                dvr.deleteById(downvote.getId());
                return ResponseEntity.status(HttpStatus.OK).body("Downvote Removed");
            }
            else if(upvote!=null){
                dVote=dVote+1;
                uVote=uVote-1;
                contentEntity.setUpVote(uVote);
                contentEntity.setDownVote(dVote);
                conr.save(contentEntity);
                uvr.deleteById(upvote.getId());
                dvr.save(dw);
                return ResponseEntity.status(HttpStatus.OK).body("Downvote Added");
            }
            else{
                dVote=dVote+1;
                contentEntity.setDownVote(dVote);
                conr.save(contentEntity);
                dvr.save(dw);
                return ResponseEntity.status(HttpStatus.OK).body("Downvote Added");
            }

        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cannot vote");

    }
    @GetMapping("/MyPosts")
    public ArrayList<ContentEntity> myPosts(@RequestParam("uname") String uname){
        ArrayList<ContentEntity> contentList= conr.findAllByUploaders(uname);
        return contentList;

    }
    @Autowired
    SaveRepo sr;
    @PostMapping("/Save")
    public ResponseEntity<Object> save(@RequestBody SaveEntity se){
        UserEntity u=ur.findByName(se.getUname());
        ContentEntity contentEntity=conr.findById(se.getConid());
        if(u!=null && contentEntity!=null){
            SaveEntity se1=sr.findByUnameAndConid(se.getUname(),se.getConid());
            if(se1!=null){
                sr.deleteById(se1.getId());
                return ResponseEntity.status(HttpStatus.OK).body("Unsaved");
            }
            else{
                sr.save(se);
                return ResponseEntity.status(HttpStatus.OK).body("saved");
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cannot save");

    }
    @GetMapping("/GetSaves")
    public ArrayList<ContentEntity> getSaves(@RequestParam String uname){
        ArrayList<SaveEntity> saveList=sr.findAllByUname(uname);
        Collections.reverse(saveList);
        ArrayList<ContentEntity> content = new ArrayList<ContentEntity>();
        for (SaveEntity sv : saveList) {
            ContentEntity ce=conr.findById(sv.getConid());
            content.add(ce);
        }
        return content;

    }
    @GetMapping("/Latest")
    public ArrayList<ContentEntity> latest(@RequestParam String cname){
        ArrayList<ContentEntity> latestList=conr.findAllByCommunity(cname);
        return latestList;

    }
    @GetMapping("/Popular")
    public ArrayList<ContentEntity> popular(@RequestParam String cname){
        ArrayList<ContentEntity> popularList=conr.findAllByCommunityPopular(cname);
        return popularList;

    }
    @Autowired
    ReportRepo reportRepo;
    @PostMapping("/Report")
    public ResponseEntity<Object> report(@RequestBody Report re){
        UserEntity u=ur.findByName(re.getUname());
        ContentEntity contentEntity=conr.findById(re.getConid());
        if(u!=null && contentEntity!=null){
            Report re1=reportRepo.findByUnameAndConid(re.getUname(),re.getConid());
            if(re1!=null){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Already Reported");
            }
            else{
                reportRepo.save(re);
                return ResponseEntity.status(HttpStatus.OK).body("Reported");
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cannot Report");

    }

    @GetMapping("/GetReport")
    public ArrayList<ReportResults> getReport(){
        ArrayList<Object[]> reports=reportRepo.findReports();
        ArrayList<ReportResults> reportResults = new ArrayList<ReportResults>();
        long contid;
        long count;
        for (Object[] report : reports) {
            Long conid = (Long) report[0];
            contid=conid;
            Long coun = (Long) report[1];
            count= coun;
            ContentEntity ce=conr.findById(contid);
            if(count>0){
            ReportResults rs=new ReportResults();
            rs.setCn(ce);
            rs.setReports(count);
            reportResults.add(rs);}
        }
        return reportResults;

    }

    @DeleteMapping("/Resolve")
    public ResponseEntity<Object> resolve(@RequestParam long conid){

        ArrayList<Report> list=reportRepo.findAllByConid(conid);
        if(!list.isEmpty()){
        for (Report report : list){
            reportRepo.deleteById(report.getId());
        }
        return ResponseEntity.status(HttpStatus.OK).body("Report Resolved");
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cannot Resolve");

    }


    @GetMapping("/IsDownvoted")
    public String isDownvoted(@RequestParam String uname, @RequestParam long conid){
        Downvote dv=dvr.findByUnameAndContid(uname,conid);
        if(dv!=null){
            return "true";
        }
        return "false";

    }
    @GetMapping("/IsUpvoted")
    public String isUpvoted(@RequestParam String uname, @RequestParam long conid){
        Upvote uv=uvr.findByUnameAndContid(uname,conid);
        if(uv!=null){
            return "true";
        }
        return "false";

    }
    @GetMapping("/Primecontent")
    public ArrayList<ContentEntity> primecontent(@RequestParam String cname){
        ArrayList<ContentEntity> primeList=conr.findAllByStatus(cname);
        return primeList;

    }
    @GetMapping("/GetContent")
    public ContentEntity getContent(@RequestParam long id){
        ContentEntity content=conr.findById(id);
        return content;

    }
    @GetMapping("/IsSaved")
    public String isSaved(@RequestParam String uname, @RequestParam long conid){
        SaveEntity se=sr.findByUnameAndConid(uname,conid);
        if(se!=null){
            return "true";
        }
        return "false";

    }




    @DeleteMapping("/DeleteContent")
    public ResponseEntity<Object> deleteContent(@RequestParam long conid){
        ContentEntity ce=conr.findById(conid);
        ArrayList<Upvote> up=uvr.findAllByContid(conid);
        ArrayList<Downvote> dw=dvr.findAllByContid(conid);
        ArrayList<Report> re = reportRepo.findAllByConid(conid);
        ArrayList<CommentEntity> come=cmr.findAllByConid(conid);
        ArrayList<SaveEntity> se=sr.findAllByConid(conid);
        ArrayList<Likes> li=new ArrayList<Likes>();

        for (SaveEntity s: se){
            sr.deleteById(s.getId());
        }
        for (Upvote u: up){
            uvr.deleteById(u.getId());
        }
        for (Downvote d: dw){
            dvr.deleteById(d.getId());
        }
        for (Report r : re){
            reportRepo.deleteById(r.getId());
        }

        for (CommentEntity c: come){
            ArrayList<Likes> li1=like.findAllByCommid(c.getId());
            for(Likes l : li1){
                li.add(l);
            }
            cmr.deleteById(c.getId());
        }
        for (Likes l:li){
            like.deleteById(l.getId());
        }

        if(ce.getType().equals("image"))
        {
            String pic=ce.getContentName();
            System.out.println(pic);
            File file=new File("src/main/webapp/images/"+pic);
            if(file.delete()){
                System.out.println("deleted");
            }
            else {
                System.out.println("not deleted");
            }

        }
        conr.deleteById(ce.getId());
        return ResponseEntity.status(HttpStatus.OK).body("Deleted");
    }
}
