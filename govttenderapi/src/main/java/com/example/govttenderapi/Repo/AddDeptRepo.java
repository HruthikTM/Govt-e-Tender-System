package com.example.govttenderapi.Repo;

import com.example.govttenderapi.Entity.AddDept;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AddDeptRepo extends JpaRepository<AddDept,Integer> {
    Optional<AddDept> findByDeptname(String deptname);
}
