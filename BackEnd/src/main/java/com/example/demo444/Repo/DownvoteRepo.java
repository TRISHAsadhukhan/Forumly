package com.example.demo444.Repo;

import com.example.demo444.Model.Downvote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface DownvoteRepo extends JpaRepository<Downvote,Long> {
    Downvote findByUnameAndContid(String uname,long id);

    ArrayList<Downvote> findAllByContid(long conid);
}
