package com.example.govttenderapi.Repo;

import com.example.govttenderapi.Entity.ClientProject;
import com.example.govttenderapi.Entity.CreateTender;
import com.example.govttenderapi.Entity.Qutation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface QutationRepo extends JpaRepository<Qutation,Integer> {



    boolean existsByCreateTenderTenderidAndBidderRegistrationBidderid(Integer tenderid,Integer bidderid);

    @Query("select q from Qutation q where q.createTender.tenderid=?1")
    List<Qutation> findByParticularTendertid(Integer id);

    @Query("select q from Qutation q where q.createTender.tenderid=?1 and q.bidderRegistration.bidderid=?2 and q.status=?3")
    Optional<Qutation> findByStatus(Integer tenderid,Integer bidderid,String status);
}
