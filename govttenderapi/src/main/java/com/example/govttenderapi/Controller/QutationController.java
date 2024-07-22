package com.example.govttenderapi.Controller;

import com.example.govttenderapi.Entity.*;
import com.example.govttenderapi.Repo.BidderRegistrationRepo;
import com.example.govttenderapi.Repo.CreateTenderRepo;
import com.example.govttenderapi.Repo.QutationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class QutationController {
    @Autowired
    private QutationRepo qutationRepo;

    @Autowired
    private BidderRegistrationRepo bidderRegistrationRepo;

    @Autowired
    private CreateTenderRepo createTenderRepo;

    @PostMapping("/Addqutation/{tenderid}/{bidderid}")
    public ResponseEntity<?> Addqutation(@RequestBody Qutation obj,@PathVariable Integer tenderid, @PathVariable Integer bidderid ) {

        if (qutationRepo.existsByCreateTenderTenderidAndBidderRegistrationBidderid(tenderid, bidderid)) {
            return new ResponseEntity<>("Qutation Aleady Exist", HttpStatus.OK);
        } else {
            Optional<CreateTender> C = createTenderRepo.findById(tenderid);
            Optional<BidderRegistration> B = bidderRegistrationRepo.findById(bidderid);
            if (C.isPresent() && B.isPresent()) {
                CreateTender createTender = C.get();
                obj.setCreateTender(createTender);
                BidderRegistration bidderRegistration = B.get();
                obj.setBidderRegistration(bidderRegistration);
                obj.setStatus("pending");
                Date d = new Date();
                SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
                String date = dateFormat.format(d);
                obj.setApplydate(date);
                qutationRepo.save(obj);
                return new ResponseEntity<>("Qutation added successfully", HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("ID not found", HttpStatus.OK);
    }

    @GetMapping("/getqutationdetails/{tenderid}")
    public ResponseEntity<?> getqutationdetails(@PathVariable Integer tenderid) {
        Optional<CreateTender> Ct = createTenderRepo.findById(tenderid);

        if (Ct.isPresent())
        {
            List<Qutation> Q = qutationRepo.findByParticularTendertid(tenderid);
            return new ResponseEntity<>(Q, HttpStatus.OK);
        } else
            return new ResponseEntity<>("Not found", HttpStatus.OK);
    }

    @PutMapping("/updatestatus/{tenderid}/{bidderid}")
    public ResponseEntity<?>UpdateStatus(@PathVariable Integer tenderid,@PathVariable Integer bidderid)
    {
        System.out.println("-----");
        Optional<CreateTender> Ct = createTenderRepo.findById(tenderid);
        Optional<BidderRegistration>Br=bidderRegistrationRepo.findById(bidderid);
        if (Ct.isPresent() && Br.isPresent())
        {
            String status="pending";
            Optional<Qutation> Q =qutationRepo.findByStatus(tenderid,bidderid,status);
            Optional<CreateTender> ct = createTenderRepo.findByStatus(tenderid,status);
            if (Q.isPresent() && ct.isPresent()) {
                Qutation qutation = Q.get();
                CreateTender createTender=ct.get();
                qutation.setStatus("approved");
                createTender.setStatus("approved");
                qutationRepo.save(qutation);
                createTenderRepo.save(createTender);
                return new ResponseEntity<>("Tender approved successfully", HttpStatus.OK);
            } else
            {
                return new ResponseEntity<>("This Tender Already approved", HttpStatus.OK);
            }
        }
        else
        {
            return new ResponseEntity<>("Tender ID/Bidder ID missmatch", HttpStatus.OK);
        }
    }
}

