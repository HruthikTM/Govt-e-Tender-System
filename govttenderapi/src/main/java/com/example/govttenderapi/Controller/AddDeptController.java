package com.example.govttenderapi.Controller;

import com.example.govttenderapi.Entity.AddDept;
import com.example.govttenderapi.Entity.AddDeptHead;
import com.example.govttenderapi.Repo.AddDeptRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class AddDeptController {

    @Autowired
    private AddDeptRepo addDeptRepo;

    @PostMapping("/AddDept")
    public ResponseEntity<?> AddDept(@RequestBody AddDept obj) {
        Optional<AddDept> D = addDeptRepo.findByDeptname(obj.getDeptname());
        if (D.isPresent())
            return new ResponseEntity<>("Department Already exist", HttpStatus.OK);
        else {
            addDeptRepo.save(obj);
            return new ResponseEntity<>("Department added Successfully", HttpStatus.OK);
        }
    }

    @GetMapping("/GetDept")
    public ResponseEntity<?>GetDept()
    {
        List<AddDept> list=addDeptRepo.findAll();
        return new ResponseEntity<>(list,HttpStatus.OK);
    }
}
