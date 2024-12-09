package com.example.demo444.Repo;

import com.example.demo444.Model.SaveEntity;
import com.example.demo444.Model.Upvote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface SaveRepo extends JpaRepository<SaveEntity, Long>{
    SaveEntity findByUnameAndConid(String uname,long conid);
    ArrayList<SaveEntity> findAllByUname(String uname);

    ArrayList<SaveEntity> findAllByConid(long conid);
}
