package com.example.govttenderapi.Controller;

import com.example.govttenderapi.DTO.Emaildata;
import com.example.govttenderapi.Entity.BidderRegistration;
import com.example.govttenderapi.Entity.ClientBasic;
import com.example.govttenderapi.Repo.BidderRegistrationRepo;
import com.example.govttenderapi.Repo.ClientBasicRepo;
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
public class ClientBasicController {
    @Autowired
    private ClientBasicRepo clientBasicRepo;

    @Autowired
    private BidderRegistrationRepo bidderRegistrationRepo;

    @Autowired
    private Smtpservice smtpservice;
    @PostMapping("/Clientbasic/{bidderid}")
    public ResponseEntity<?> Clientbasic(@PathVariable Integer bidderid,@RequestBody ClientBasic obj )
    {
        Optional<ClientBasic> C = clientBasicRepo.findByEmail(obj.getEmail());
        if (C.isPresent())
            return new ResponseEntity<>("Client Aleady Exist", HttpStatus.OK);
        else {
            Random rnd=new Random();
            int id= rnd.nextInt(100000,999999);
            int password= rnd.nextInt(1000,9999);
            obj.setClientid(id);
            obj.setPassword(String.valueOf(password));
            Optional<BidderRegistration> B = bidderRegistrationRepo.findById(bidderid);
            if (B.isPresent()) {
                BidderRegistration bidderRegistration = B.get();
                obj.setBidderRegistration(bidderRegistration);
                clientBasicRepo.save(obj);

                Emaildata emaildata=new Emaildata();
                emaildata.setRecipient(obj.getEmail());
                emaildata.setSubject("Login credentails");
                String Message="Login Credentails User ID:"+ id + "& Password" + password;
                emaildata.setMessage(Message);
                smtpservice.sendMail(emaildata);

                return new ResponseEntity<>("Client added successfully", HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>("Bidder ID not Found", HttpStatus.OK);
            }
        }
    }

    @GetMapping("/GetClientBasicDetails/{id}")
    public ResponseEntity<?>GetClientBasicDetails(@PathVariable Integer id)
    {
        System.out.println("-----------");
        Optional<BidderRegistration> B=bidderRegistrationRepo.findById(id);
        if(B.isPresent())
        {
            BidderRegistration bidderRegistration = B.get();
            int depid=bidderRegistration.getBidderid();
            List<ClientBasic> lst=clientBasicRepo.findByParticularBidderid(depid);
            return new ResponseEntity<>(lst,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Not found",HttpStatus.OK);
    }

    @GetMapping("/GetClient")
    public ResponseEntity<?>GetClient()
    {
        List<ClientBasic> list=clientBasicRepo.findAll();
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @GetMapping("/chkClientLogin/{userid}/{password}")
    public ResponseEntity<?> chkClientLogin(@PathVariable Integer userid,@PathVariable String password)
    {
        Optional<ClientBasic>L=clientBasicRepo.findById(Integer.valueOf(userid));
        if(L.isPresent())
        {
            ClientBasic clientBasic=L.get();
            if(clientBasic.getPassword().equals(password))
                return new ResponseEntity<>("Correct Password",HttpStatus.OK);
            else
                return new ResponseEntity<>("Invalid Password",HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Bidder ID not found",HttpStatus.OK);
    }

}
