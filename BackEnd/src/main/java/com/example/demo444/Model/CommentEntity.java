package com.example.demo444.Model;

import jakarta.persistence.*;

@Entity
public class CommentEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private long conid;
    @Column(nullable = false)
    private String uname;
    @Column(nullable = false)
    private String comment;
    private int likes;

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }



    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getConid() {
        return conid;
    }

    public void setConid(long conid) {
        this.conid = conid;
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }
}
