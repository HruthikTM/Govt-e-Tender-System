package com.example.govttenderapi.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClientBasic {
    @Id
    private int clientid;
    private String clientname;
    private String password;
    private String email;
    private String pno;
    private String address;

    @ManyToOne
    @JoinColumn(name= "bidderid")
    private BidderRegistration bidderRegistration;

    @OneToMany(mappedBy = "clientBasic")
    @JsonIgnore
    private List<ClientProject> clientProject;
}
