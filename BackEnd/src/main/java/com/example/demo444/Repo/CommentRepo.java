package com.example.demo444.Repo;

import com.example.demo444.Model.CommentEntity;
import com.example.demo444.Model.ContentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface CommentRepo extends JpaRepository <CommentEntity, Long> {
    CommentEntity findById(long id);
    @Query(value = "select * from comment_entity where conid=?1 order by id desc;", nativeQuery = true)
    ArrayList<CommentEntity> findAllByConid(long conid);
    @Query(value = "SELECT * FROM comment_entity where conid=?1 ORDER BY likes DESC,id desc;", nativeQuery = true)
    ArrayList<CommentEntity> findAllByConidPopular(long conid);
    @Query(value = "select c.* from comment_entity c, user_entity u where c.uname=u.name and u.status='prime' and c.conid=?1 order by c.id desc;", nativeQuery = true)
    ArrayList<CommentEntity> findAllByStatus(long conid);

}
