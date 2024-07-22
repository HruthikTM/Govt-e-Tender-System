package com.example.govttenderapi.Controller;

import com.example.govttenderapi.DTO.Emaildata;
import com.example.govttenderapi.Entity.AddDeptHead;
import com.example.govttenderapi.Entity.BidderRegistration;
import com.example.govttenderapi.Entity.CreateTender;
import com.example.govttenderapi.Repo.BidderRegistrationRepo;
import com.example.govttenderapi.Repo.CreateTenderRepo;
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
public class BidderRegistrationController {
    @Autowired
    private BidderRegistrationRepo bidderRegistrationRepo;

    @Autowired
    private CreateTenderRepo createTenderRepo;

    @Autowired
    private Smtpservice smtpservice;

    @PostMapping("/BidderRegistration")
    public ResponseEntity<?> BidderRegistration(@RequestBody BidderRegistration obj) {
        Optional<BidderRegistration> B = bidderRegistrationRepo.findByEmail(obj.getEmail());
        if (B.isPresent()) {
            return new ResponseEntity<>("Email ID Already exist", HttpStatus.OK);
        } else {
            Random rnd = new Random();
            int id = rnd.nextInt(100000, 999999);
            int password = rnd.nextInt(1000, 9999);
            obj.setBidderid(id);
            obj.setPassword(String.valueOf(password));

            Emaildata emaildata = new Emaildata();
            emaildata.setRecipient(obj.getEmail());
            emaildata.setSubject("Login credentails");
            String Message = "Login Credentails User ID:" + id + "& Password" + password;
            emaildata.setMessage(Message);
            smtpservice.sendMail(emaildata);

        }
        bidderRegistrationRepo.save(obj);


        return new ResponseEntity<>("Bidder Registration details added Successfully", HttpStatus.OK);
    }

    @GetMapping("/chkBidderLogin/{userid}/{password}")
    public ResponseEntity<?> chkBidderLogin(@PathVariable Integer userid, @PathVariable String password) {
        Optional<BidderRegistration> L = bidderRegistrationRepo.findById(Integer.valueOf(userid));
        if (L.isPresent()) {
            BidderRegistration bidderRegistration = L.get();
            if (bidderRegistration.getPassword().equals(password))
                return new ResponseEntity<>("Correct Password", HttpStatus.OK);
            else
                return new ResponseEntity<>("Invalid Password", HttpStatus.OK);
        } else
            return new ResponseEntity<>("Bidder ID not found", HttpStatus.OK);
    }

    @GetMapping("/getbiddername/{bidderid}")
    public ResponseEntity<?> getbiddername(@PathVariable Integer bidderid) {
        Optional<BidderRegistration> Br = bidderRegistrationRepo.findById(bidderid);
        if (Br.isPresent()) {
            BidderRegistration bidderRegistration = Br.get();
            return new ResponseEntity<>(bidderRegistration.getBiddername(), HttpStatus.OK);
        }
        return new ResponseEntity<>("BidderId not found", HttpStatus.OK);
    }

    @GetMapping("/getbidderdetails/{id}")
    public ResponseEntity<?> getbidderdetails(@PathVariable Integer id)
    {
        Optional<CreateTender>Ct =createTenderRepo.findById(id);
        if(Ct.isPresent()){
            List<BidderRegistration> Br=bidderRegistrationRepo.findByParticularTenderid(id);
            return new ResponseEntity<>(Br,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Not found",HttpStatus.OK);
    }
}
