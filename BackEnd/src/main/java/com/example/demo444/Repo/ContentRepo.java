package com.example.demo444.Repo;

import com.example.demo444.Model.ContentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface ContentRepo extends JpaRepository<ContentEntity, Long> {
    ContentEntity findById(long id);
    @Query(value = "select * from content_entity where uploader=?1 order by id desc;", nativeQuery = true)
    ArrayList<ContentEntity> findAllByUploaders(String uname);
    @Query(value = "select * from content_entity where community=?1 order by id desc;", nativeQuery = true)
    ArrayList<ContentEntity> findAllByCommunity(String cname);
    @Query(value = "SELECT * FROM content_entity where community=?1 ORDER BY (up_vote-down_vote) DESC,id desc;", nativeQuery = true)
    ArrayList<ContentEntity> findAllByCommunityPopular(String cname);
    @Query(value = "select c.* from content_entity c, user_entity u where c.uploader=u.name and u.status='prime' and c.community=?1 order by c.id desc;", nativeQuery = true)
    ArrayList<ContentEntity> findAllByStatus(String cname);
}
