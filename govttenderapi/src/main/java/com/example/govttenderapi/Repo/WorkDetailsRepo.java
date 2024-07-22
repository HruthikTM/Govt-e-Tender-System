package com.example.govttenderapi.Repo;

import com.example.govttenderapi.Entity.WorkDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface WorkDetailsRepo extends JpaRepository<WorkDetails,Integer> {

    Optional<WorkDetails> findByWorkname(String workname);


    @Query("select wd from WorkDetails wd where wd.addDept.deptid=?1")
    List<WorkDetails> findByParticularDeptidWork(Integer id);

}



