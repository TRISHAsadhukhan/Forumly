package com.example.demo444.Model;

import jakarta.persistence.*;

@Entity
public class Member {


    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "Member_Id")
    private long  id;
    @Column(nullable = false)
    private String  cname;
    @Column(nullable = false)
    private String uname;
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }
}
