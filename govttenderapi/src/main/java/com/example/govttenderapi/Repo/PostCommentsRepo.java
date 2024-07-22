package com.example.govttenderapi.Repo;

import com.example.govttenderapi.Entity.ClientProject;
import com.example.govttenderapi.Entity.PostComments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostCommentsRepo extends JpaRepository<PostComments,Integer> {

    boolean existsByClientProjectProjectid(Integer projectid);

    @Query("select pc from PostComments pc where pc.clientProject.projectid=?1")
    List<PostComments> findByParticularProjectid(Integer id);
}
