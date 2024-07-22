package com.example.govttenderapi.Controller;

import com.example.govttenderapi.Entity.AddDept;
import com.example.govttenderapi.Entity.AddDeptHead;
import com.example.govttenderapi.Entity.WorkDetails;
import com.example.govttenderapi.Repo.AddDeptHeadRepo;
import com.example.govttenderapi.Repo.AddDeptRepo;
import com.example.govttenderapi.Repo.WorkDetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class WorkDetailsController {

    @Autowired
    private WorkDetailsRepo workDetailsRepo;

    @Autowired
    private AddDeptRepo addDeptRepo;

    @Autowired
    private AddDeptHeadRepo addDeptHeadRepo;

    @PostMapping("/Workdetails/{headid}")
    public ResponseEntity<?>Workdetails(@RequestBody WorkDetails obj,@PathVariable Integer headid)
    {

        Optional<WorkDetails> W = workDetailsRepo.findByWorkname(obj.getWorkname());
        if (W.isPresent())
            return new ResponseEntity<>("Work Name Aleady Exist", HttpStatus.OK);
        else {
            Optional<AddDeptHead> O = addDeptHeadRepo.findById(headid);
            if (O.isPresent()) {
                AddDeptHead addDeptHead = O.get();
                obj.setAddDept(addDeptHead.getAddDept());
                obj.setStatus("pending");
                workDetailsRepo.save(obj);
                return new ResponseEntity<>("Work Name added successfully", HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>("Department not Found", HttpStatus.OK);
            }
        }
    }

    @GetMapping("/GetWorkDetails/{headid}")
    public ResponseEntity<?>GetWorkDetails(@PathVariable Integer headid)
    {
        Optional<AddDeptHead> Ah=addDeptHeadRepo.findById(headid);
        if(Ah.isPresent())
        {
            AddDeptHead addDeptHead=Ah.get();
            int depid=addDeptHead.getAddDept().getDeptid();
            List<WorkDetails> lst=workDetailsRepo.findByParticularDeptidWork(depid);
            return new ResponseEntity<>(lst,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Not found",HttpStatus.OK);
    }

    @GetMapping("/GetWork")
    public ResponseEntity<?>GetWork()
    {
        List<WorkDetails> list=workDetailsRepo.findAll();
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

}
