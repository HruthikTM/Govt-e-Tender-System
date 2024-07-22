package com.example.govttenderapi.Repo;


import com.example.govttenderapi.Entity.ClientProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ClientProjectRepo extends JpaRepository<ClientProject,Integer>{

    Optional<ClientProject> findByProjectname(String projectname);

    @Query("select cp from ClientProject cp where cp.clientBasic.clientid=?1")
    List<ClientProject> findByParticularClientid(Integer id);

    @Query("select cp.projectname,cp.description,cp.status,cp.projectdate,cb.clientname from ClientProject cp inner join ClientBasic cb on cp.clientBasic.clientid=cb.clientid where cb.bidderRegistration.bidderid=?1")
    List<Object> findBybidderid(Integer bidderid);

    @Query("select cp from ClientProject cp where cp.clientBasic.clientid=?1 and cp.status=?2")
    Optional<ClientProject> findByStatus(Integer clidentid,String status);

}
