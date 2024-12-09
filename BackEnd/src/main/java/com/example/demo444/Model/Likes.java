package com.example.demo444.Model;

import jakarta.persistence.*;

@Entity
public class Likes {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long  id;
    @Column(nullable = false)
    private String uname;
    @Column(nullable = false)
    private long commid;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }

    public long getCommid() {
        return commid;
    }

    public void setCommid(long commid) {
        this.commid = commid;
    }
}
