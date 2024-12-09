package com.example.demo444.Repo;

import com.example.demo444.Model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface ReportRepo extends JpaRepository<Report, Long> {
    Report findByUnameAndConid(String uname, long conid);
    ArrayList<Report> findAllByConid(long conid);
    int deleteAllByConid(long conid);
    @Query(value = "select conid,count(conid) as count from report group by conid order by count(conid) desc , conid desc;", nativeQuery = true)
    ArrayList<Object[]> findReports();
}
