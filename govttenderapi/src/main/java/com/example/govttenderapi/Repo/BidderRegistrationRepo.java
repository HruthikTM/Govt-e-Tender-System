package com.example.govttenderapi.Repo;

import com.example.govttenderapi.Entity.AddDeptHead;
import com.example.govttenderapi.Entity.BidderRegistration;
import com.example.govttenderapi.Entity.CreateTender;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BidderRegistrationRepo extends JpaRepository<BidderRegistration,Integer> {

    Optional<BidderRegistration> findByEmail(String email);

    @Query("select br from BidderRegistration br inner join Qutation q on br.bidderid=q.bidderRegistration.bidderid where q.createTender.tenderid=?1")
    List<BidderRegistration> findByParticularTenderid(Integer id);

}
