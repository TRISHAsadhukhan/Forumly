package com.example.demo444.Repo;

import com.example.demo444.Model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository

public interface UserRepo extends JpaRepository<UserEntity,String> {
    UserEntity findByEmail(String email);
    UserEntity findByName(String name);
    UserEntity findByNameOrEmail(String name,String email);

    @Query(value = "select * from user_entity where BINARY name = ?1 and BINARY password = ?2", nativeQuery = true)
    UserEntity findByNamesAndPasswords(String name, String password);


}
