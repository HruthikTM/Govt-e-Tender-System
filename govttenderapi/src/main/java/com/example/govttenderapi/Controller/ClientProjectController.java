package com.example.govttenderapi.Controller;

import com.example.govttenderapi.Entity.*;
import com.example.govttenderapi.Repo.BidderRegistrationRepo;
import com.example.govttenderapi.Repo.ClientBasicRepo;
import com.example.govttenderapi.Repo.ClientProjectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@RestController
@CrossOrigin("*")
public class ClientProjectController {
    @Autowired
    private ClientBasicRepo clientBasicRepo;

    @Autowired
    private ClientProjectRepo clientProjectRepo;

    @Autowired
    private BidderRegistrationRepo bidderRegistrationRepo;

    @PostMapping("/Clientproject/{clientid}")
    public ResponseEntity<?> Clientproject(@PathVariable Integer clientid, @RequestBody ClientProject obj) {
        Date d = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        String date = dateFormat.format(d);
        obj.setProjectdate(date);
        Optional<ClientProject> C = clientProjectRepo.findByProjectname(obj.getProjectname());
        if (C.isPresent())
            return new ResponseEntity<>("Project Aleady Exist", HttpStatus.OK);
        else {
            Optional<ClientBasic> Cb = clientBasicRepo.findById(clientid);
            if (Cb.isPresent()) {
                ClientBasic clientBasic = Cb.get();
                obj.setClientBasic(clientBasic);
                obj.setStatus("pending");
                clientProjectRepo.save(obj);
                return new ResponseEntity<>("Project added successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Client ID not Found", HttpStatus.OK);
            }
        }
    }

    @GetMapping("/getclientprojectdetails/{clientID}")
    public ResponseEntity<?> getclientprojectdetails(@PathVariable Integer clientID) {
        Optional<ClientBasic> Cb = clientBasicRepo.findById(clientID);
        if (Cb.isPresent()) {
            List<ClientProject> Ct = clientProjectRepo.findByParticularClientid(clientID);
            return new ResponseEntity<>(Ct, HttpStatus.OK);
        } else
            return new ResponseEntity<>("Not found", HttpStatus.OK);
    }


    @GetMapping("/GetProject")
    public ResponseEntity<?> GetProject() {
        List<ClientProject> list = clientProjectRepo.findAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/GetClientprojectDetails/{ID}")
    public ResponseEntity<?> GetClientprojectDetails(@PathVariable Integer ID) {
        Optional<BidderRegistration> Br = bidderRegistrationRepo.findById(ID);
        if (Br.isPresent()) {
            var Cp = clientProjectRepo.findBybidderid(ID);
            return new ResponseEntity<>(Cp, HttpStatus.OK);
        } else
            return new ResponseEntity<>("Bidder ID not found", HttpStatus.OK);
    }

@PutMapping("/UpdateStatus/{clientID}")
public ResponseEntity<?>UpdateStatus(@PathVariable Integer clientID)
{
    Optional<ClientBasic> Cb=clientBasicRepo.findById(clientID);
    if(  Cb.isPresent() )
    {
        String status="pending";
        Optional<ClientProject> cp =clientProjectRepo.findByStatus(clientID,status);
            if (cp.isPresent()) {
                ClientProject clientProject = cp.get();
                clientProject.setStatus("completed");
                clientProjectRepo.save(clientProject);
                return new ResponseEntity<>("Client project updated successfully", HttpStatus.OK);
            } else
            {
                return new ResponseEntity<>("This Project Already Completed", HttpStatus.OK);
            }
    }
    else
    {
        return new ResponseEntity<>("Client ID missmatch", HttpStatus.OK);
    }
}
}
