package com.example.govttenderapi.Controller;

import com.example.govttenderapi.Entity.*;
import com.example.govttenderapi.Repo.AddDeptHeadRepo;
import com.example.govttenderapi.Repo.AddDeptRepo;
import com.example.govttenderapi.Repo.CreateTenderRepo;
import com.example.govttenderapi.Repo.WorkDetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class CreateTenderController {

    @Autowired
    private CreateTenderRepo createTenderRepo;
    @Autowired
    private WorkDetailsRepo workDetailsRepo;

    @Autowired
    private AddDeptRepo addDeptRepo;

    @Autowired
    private AddDeptHeadRepo addDeptHeadRepo;

    @PostMapping("/Createtender/{workid}")
    public ResponseEntity<?> Createtender(@RequestBody CreateTender obj, @PathVariable Integer workid)
    {
        Date d=new Date();
        SimpleDateFormat dateFormat=new SimpleDateFormat("dd-MM-yyyy");
        String date=dateFormat.format(d);
        obj.setTenderdate(date);
        Optional<CreateTender> C = createTenderRepo.findByTendername(obj.getTendername());
        if (C.isPresent())
            return new ResponseEntity<>("Tender Aleady Exist", HttpStatus.OK);
        else {
            Optional<WorkDetails> W = workDetailsRepo.findById(workid);
            if (W.isPresent()) {
                WorkDetails workDetails = W.get();
                obj.setWorkDetails(workDetails);
                obj.setStatus("pending");
                createTenderRepo.save(obj);
                return new ResponseEntity<>("Tender added successfully", HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>("Work ID not Found", HttpStatus.OK);
            }
        }
    }

    @GetMapping("/GetTender")
    public ResponseEntity<?>GetTender()
    {
        List<CreateTender> list=createTenderRepo.findAll();
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @GetMapping("/GetTenderDetails/{id}")
    public ResponseEntity<?>GetTenderDetails(@PathVariable Integer id)
    {
        Optional<AddDept> Ad=addDeptRepo.findById(id);
        if(Ad.isPresent())
        {
            List<CreateTender> list=createTenderRepo.findByWorkDetailsAddDeptDeptid(id);
            return new ResponseEntity<>(list,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Dept not found",HttpStatus.OK);
    }

    @GetMapping("/gettenderdetails/{id}")
    public ResponseEntity<?>gettenderdetails(@PathVariable Integer id)
    {
        Optional<WorkDetails> Wd=workDetailsRepo.findById(id);
        if(Wd.isPresent())
        {
            List<CreateTender> Ct=createTenderRepo.findByParticularWorkid(id);
            return new ResponseEntity<>(Ct,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Not found",HttpStatus.OK);
    }

    @GetMapping("/Applyforqutation/{tenderid}/{tenderdate}/{tenderstdate}/{tenderenddate}")
    public ResponseEntity<?> applyDate(@PathVariable Integer tenderid,@PathVariable String tenderdate,@PathVariable String tenderstdate,@PathVariable String tenderenddate) {

        String todayDate = tenderdate;
        String beforeDate = tenderstdate;
        String afterDate = tenderenddate;

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");

        LocalDate today = LocalDate.parse(todayDate, formatter);
        LocalDate startDate = LocalDate.parse(beforeDate, formatter);
        LocalDate endDate = LocalDate.parse(afterDate, formatter);

        if ((today.isEqual(startDate) || today.isAfter(startDate)) && (today.isEqual(endDate) || today.isBefore(endDate)))
            return new ResponseEntity<>("Today is within the range", HttpStatus.OK);
        else
            return new ResponseEntity<>("Today is not within the range", HttpStatus.OK);
    }

}
