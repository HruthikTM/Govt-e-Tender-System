package com.example.govttenderapi.Repo;

import com.example.govttenderapi.Entity.CreateTender;
import com.example.govttenderapi.Entity.Qutation;
import com.example.govttenderapi.Entity.WorkDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CreateTenderRepo extends JpaRepository<CreateTender,Integer> {

    Optional<CreateTender> findByTendername(String tendername);

    List<CreateTender> findByWorkDetailsAddDeptDeptid(Integer id);

    @Query("select ct from CreateTender ct where ct.workDetails.workid=?1")
    List<CreateTender> findByParticularWorkid(Integer id);

    @Query("select ct from CreateTender ct where ct.tenderid=?1 and ct.status=?2")
    Optional<CreateTender> findByStatus(Integer tenderid,String status);

}
