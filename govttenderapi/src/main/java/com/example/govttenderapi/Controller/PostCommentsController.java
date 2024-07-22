package com.example.govttenderapi.Controller;

import com.example.govttenderapi.Entity.*;
import com.example.govttenderapi.Repo.ClientProjectRepo;
import com.example.govttenderapi.Repo.PostCommentsRepo;
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
public class PostCommentsController {
    @Autowired
    private PostCommentsRepo postCommentsRepo;

    @Autowired
    private ClientProjectRepo clientProjectRepo;

    @PostMapping("/Postcomments/{projectid}")
    public ResponseEntity<?> Postcomments(@RequestBody PostComments obj, @PathVariable Integer projectid ) {

        if (postCommentsRepo.existsByClientProjectProjectid(projectid)) {
            return new ResponseEntity<>("Comments Aleady Exist", HttpStatus.OK);
        } else {
            Optional<ClientProject> C = clientProjectRepo.findById(projectid);
            if (C.isPresent()) {
                ClientProject clientProject = C.get();
                obj.setClientProject(clientProject);
                Date d = new Date();
                SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
                String date = dateFormat.format(d);
                obj.setPostdate(date);
                postCommentsRepo.save(obj);
                return new ResponseEntity<>("Comments added successfully", HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("ID not found", HttpStatus.OK);
    }

    @GetMapping("/getfeedback/{id}")
    public ResponseEntity<?> getfeedback(@PathVariable Integer id) {
        Optional<ClientProject> Cp = clientProjectRepo.findById(id);
        if (Cp.isPresent()) {
            List<PostComments> Pc = postCommentsRepo.findByParticularProjectid(id);
            return new ResponseEntity<>(Pc, HttpStatus.OK);
        } else
            return new ResponseEntity<>("Not found", HttpStatus.OK);
    }
}
