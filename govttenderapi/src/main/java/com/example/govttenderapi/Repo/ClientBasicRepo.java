package com.example.govttenderapi.Repo;

import com.example.govttenderapi.Entity.AddDeptHead;
import com.example.govttenderapi.Entity.ClientBasic;
import com.example.govttenderapi.Entity.WorkDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ClientBasicRepo extends JpaRepository<ClientBasic,Integer> {
    Optional<ClientBasic> findByEmail(String email);

    @Query("select cb from ClientBasic cb where cb.bidderRegistration.bidderid=?1")
    List<ClientBasic> findByParticularBidderid(Integer id);
}
