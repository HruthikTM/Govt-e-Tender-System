package com.example.govttenderapi.Controller;


import com.example.govttenderapi.DTO.Emaildata;
import com.example.govttenderapi.Entity.AddDeptHead;
import com.example.govttenderapi.Entity.BidderRegistration;
import com.example.govttenderapi.Entity.ClientBasic;
import com.example.govttenderapi.Repo.AddDeptHeadRepo;
import com.example.govttenderapi.Repo.BidderRegistrationRepo;
import com.example.govttenderapi.Repo.ClientBasicRepo;
import com.example.govttenderapi.SMTP.Smtpservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Random;

@RestController
@CrossOrigin("*")
public class EmailController {
    @Autowired
    Smtpservice smtpservice;
    @Autowired
    AddDeptHeadRepo addDeptHeadRepo;
    @Autowired
    BidderRegistrationRepo bidderRegistrationRepo;
    @Autowired
    ClientBasicRepo clientBasicRepo;

    @PostMapping("/sendotp/{email}")
    public ResponseEntity<?>sendotp(@PathVariable String email)
    {
        Optional<AddDeptHead>Ad=addDeptHeadRepo.findByEmail(email);
        Optional<BidderRegistration>Br=bidderRegistrationRepo.findByEmail(email);
        Optional<ClientBasic>Cb=clientBasicRepo.findByEmail(email);
        if (Ad.isPresent() || Br.isPresent() || Cb.isPresent())
        {
            Random rnd=new Random();
            int otp= rnd.nextInt(1000,9999);
            Emaildata emaildata=new Emaildata();
            emaildata.setOtp(otp);
            emaildata.setRecipient(email);
            emaildata.setMessage("Otp verification");
            emaildata.setSubject("Your Otp is " + otp);
            String message=smtpservice.sendotp(emaildata);
            if(message.equals("Mail sent successfully"))
                return new ResponseEntity<>("OTP sent to your email pls check", HttpStatus.OK);
            else
                return new ResponseEntity<>(message,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Email id doesn't exist", HttpStatus.OK);
    }

    @GetMapping("/chkotp/{otp}")
    public ResponseEntity<?>chkotp(@PathVariable Integer otp)
    {
        Emaildata emaildata=new Emaildata();
        emaildata.setOtp(otp);
        String msg=smtpservice.chkotp(emaildata);
        if (msg.equals("Correct Otp"))
            return new ResponseEntity<>("Entered Correct OTP", HttpStatus.OK);
        else
            return new ResponseEntity<>("Wrong OTP", HttpStatus.OK);
    }

    @PutMapping("/changepassword/{email}/{newpassword}")
    public ResponseEntity<?>changepassword(@PathVariable String email,@PathVariable String newpassword)
    {
        Optional<AddDeptHead>Ad=addDeptHeadRepo.findByEmail(email);
        Optional<BidderRegistration>Br=bidderRegistrationRepo.findByEmail(email);
        Optional<ClientBasic>Cb=clientBasicRepo.findByEmail(email);
        if (Ad.isPresent())
        {
            AddDeptHead addDeptHead=Ad.get();
            addDeptHead.setPassword(newpassword);
            addDeptHeadRepo.save(addDeptHead);
            return new ResponseEntity<>("Password Changed Sucessfully",HttpStatus.OK);
        }
        else if (Br.isPresent())
        {
            BidderRegistration bidderRegistration=Br.get();
            bidderRegistration.setPassword(newpassword);
            bidderRegistrationRepo.save(bidderRegistration);
            return new ResponseEntity<>("Password Changed Sucessfully",HttpStatus.OK);
        }
        else if (Cb.isPresent())
        {
            ClientBasic clientBasic=Cb.get();
            clientBasic.setPassword(newpassword);
            clientBasicRepo.save(clientBasic);
            return new ResponseEntity<>("Password Changed Sucessfully",HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Email NOT Found",HttpStatus.OK);
    }



}
