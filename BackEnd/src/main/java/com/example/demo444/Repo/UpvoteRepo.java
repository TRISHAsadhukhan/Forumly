package com.example.demo444.Repo;

import com.example.demo444.Model.Upvote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface UpvoteRepo extends JpaRepository<Upvote,Long> {
    Upvote findByUnameAndContid(String uname,long id);

    ArrayList<Upvote> findAllByContid(long conid);
}
