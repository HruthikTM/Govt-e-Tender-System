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
public class BidderRegistration {
    @Id
    private int bidderid;
    private String biddername;
    private String password;
    private String email;
    private String pno;
    private String address;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String filepath;

    @OneToMany(mappedBy = "bidderRegistration")
    @JsonIgnore
    private List<ClientBasic> clientBasic;

    @OneToMany(mappedBy = "bidderRegistration")
    @JsonIgnore
    private List<Qutation> qutation;

}
