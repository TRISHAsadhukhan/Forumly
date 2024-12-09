package com.example.demo444.Repo;

import com.example.demo444.Model.CommunityEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface CommunityRepo extends CrudRepository<CommunityEntity, Long> {
    CommunityEntity findByCommunityname(String cname);
    CommunityEntity findByUsernameAndCommunityname(String uname,String cname);
    @Query(value = "SELECT * FROM community_entity  WHERE communityname like ?1%", nativeQuery = true)
    ArrayList<CommunityEntity> searchSmall(String query);
    @Query(value = "SELECT * FROM community_entity  WHERE communityname like %?1%", nativeQuery = true)
    ArrayList<CommunityEntity> searchLarge(String query);
    @Query(value = "SELECT * FROM community_entity", nativeQuery = true)
    ArrayList<CommunityEntity> searchTag();
    //"SELECT * FROM community_entity  WHERE communityname like '%:query%'"
    @Query(value = "select * from community_entity order by member_count desc , id desc LIMIT 4 OFFSET 0 ;", nativeQuery = true)
    ArrayList<CommunityEntity> topCommunity();
    @Query(value = " SELECT  DISTINCT  community_entity.* FROM Member RIGHT JOIN community_entity ON community_entity.communityname=member.cname where Member.uname=:username OR community_entity.username=:username order by id desc LIMIT 4 OFFSET 0 ;", nativeQuery = true)
    ArrayList<CommunityEntity> myComm(@Param("username") String username);

    @Query(value = " SELECT  DISTINCT  community_entity.* FROM Member RIGHT JOIN community_entity ON community_entity.communityname=member.cname where Member.uname=:username OR community_entity.username=:username order by id desc ;", nativeQuery = true)
    ArrayList<CommunityEntity> myCommAll(@Param("username") String username);
}
