package com.example.govttenderapi.Controller;

import com.example.govttenderapi.DTO.Emaildata;
import com.example.govttenderapi.Entity.AddDept;
import com.example.govttenderapi.Entity.AddDeptHead;
import com.example.govttenderapi.Repo.AddDeptHeadRepo;
import com.example.govttenderapi.Repo.AddDeptRepo;
import com.example.govttenderapi.SMTP.Smtpservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@RestController
@CrossOrigin("*")
public class AddDeptHeadController {

    @Autowired
    private AddDeptHeadRepo addDeptHeadRepo;

    @Autowired
    private AddDeptRepo addDeptRepo;

    @Autowired
    private Smtpservice smtpservice;

    @PostMapping("/AddDeptHead/{deptid}")
    public ResponseEntity<?> AddDeptHead(@RequestBody AddDeptHead obj,@PathVariable Integer deptid)
    {
        Optional<AddDeptHead> D=addDeptHeadRepo.findByEmail(obj.getEmail());
        if(D.isPresent()) {
            return new ResponseEntity<>("Email ID Already exist", HttpStatus.OK);
        }
        else{
            Random rnd=new Random();
            int id= rnd.nextInt(100000,999999);
            int password= rnd.nextInt(1000,9999);
            obj.setDheadid(id);
            obj.setPassword(String.valueOf(password));

            Optional<AddDept>O=addDeptRepo.findById(deptid);
            if(O.isPresent()){
                AddDept addDept= O.get();
                obj.setAddDept(addDept);
                addDeptHeadRepo.save(obj);
                Emaildata emaildata=new Emaildata();
                emaildata.setRecipient(obj.getEmail());
                emaildata.setSubject("Login credentails");
                String Message="Login Credentails User ID:"+ id + "& Password" + password;
                emaildata.setMessage(Message);
                smtpservice.sendMail(emaildata);

            }
            else
            {
                return new ResponseEntity<>("Department not Found",HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("Dept Head added Successfully",HttpStatus.OK);
        }

    @GetMapping("/chkDeptHeadLogin/{userid}/{password}")
    public ResponseEntity<?> chkDeptHeadLogin(@PathVariable Integer userid,@PathVariable String password)
    {
        Optional<AddDeptHead>L=addDeptHeadRepo.findById(Integer.valueOf(userid));
        if(L.isPresent())
        {
            AddDeptHead addDeptHead=L.get();
            if(addDeptHead.getPassword().equals(password))
                return new ResponseEntity<>("Correct Password",HttpStatus.OK);
            else
                return new ResponseEntity<>("Invalid Password",HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Department ID not found",HttpStatus.OK);
    }

    @GetMapping("/GetDeptHead")
    public ResponseEntity<?>GetDeptHead()
    {
        List<AddDeptHead> list=addDeptHeadRepo.findAll();
        return new ResponseEntity<>(list,HttpStatus.OK);
    }
@GetMapping("/getdeptheaddetails/{Id}")
    public ResponseEntity<?>getdeptheaddetails(@PathVariable Integer Id)
{
    Optional<AddDeptHead> Ah=addDeptHeadRepo.findById(Id);
    if(Ah.isPresent())
    {
        AddDeptHead addDeptHead=Ah.get();
        int depid=addDeptHead.getAddDept().getDeptid();
        return new ResponseEntity<>(depid,HttpStatus.OK);
    }
    else {
        return new ResponseEntity<>("Deptid Not Found",HttpStatus.OK);
    }
}
}
