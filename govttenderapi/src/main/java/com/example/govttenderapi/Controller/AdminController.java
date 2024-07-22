package com.example.govttenderapi.Controller;

import com.example.govttenderapi.Entity.Admin;
import com.example.govttenderapi.Repo.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class AdminController {
    @Autowired
    private AdminRepo adminRepo;

    @PostMapping("/GovtLogin")
    public ResponseEntity<?> userLogin(@RequestBody Admin obj){
        var user = adminRepo.findById(obj.getUserid()).orElseThrow(() -> new RuntimeException("User Not Found"));
        if (user.getPassword().equals(obj.getPassword()))
            return new ResponseEntity<>("Login Successfully", HttpStatus.OK);
        else
            return new ResponseEntity<>("Invalid Password",HttpStatus.OK);
    }
}
