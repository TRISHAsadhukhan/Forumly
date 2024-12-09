package com.example.demo444.Model;

import jakarta.persistence.*;

@Entity
public class Upvote {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long  id;
    @Column(nullable = false)
    private String uname;
    @Column(nullable = false)
    private long contid;

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
    public long getContid() {
        return contid;
    }

    public void setContid(long contid) {
        this.contid = contid;
    }
}
