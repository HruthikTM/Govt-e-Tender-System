package com.example.govttenderapi.Repo;

import com.example.govttenderapi.Entity.AddDeptHead;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AddDeptHeadRepo extends JpaRepository<AddDeptHead,Integer> {

    Optional<AddDeptHead> findByEmail(String email);
}
