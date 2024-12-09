package com.example.demo444.Model;


import jakarta.persistence.*;
import lombok.*;

import java.util.List;
@Entity
public class UserEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "user_id")
    private long id;
    public void setName(String name) {
        this.name = name;
    }
    @Column(unique = true,nullable = false)
    private String name;
    @Column(unique = true,nullable = false)
    private  String email;
    @Column(nullable = false)
    private  String password;
    private  String status;
    private  String avatar;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}
