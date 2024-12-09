package com.example.demo444.Repo;

import com.example.demo444.Model.Likes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface LikesRepo extends JpaRepository<Likes,Long> {
    Likes findByUnameAndCommid(String uname, long commid);

    ArrayList<Likes> findAllByCommid(long id);
}
