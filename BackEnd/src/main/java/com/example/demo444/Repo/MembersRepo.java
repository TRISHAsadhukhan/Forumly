package com.example.demo444.Repo;

import com.example.demo444.Model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MembersRepo extends JpaRepository<Member, Long> {
    Member findByUnameAndCname(String uname,String cname);

}
