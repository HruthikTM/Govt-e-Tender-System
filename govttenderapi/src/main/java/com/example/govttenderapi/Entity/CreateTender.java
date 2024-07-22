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
public class CreateTender {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int tenderid;
    private String tendername;
    private String tenderstdate;
    private String tenderenddate;
    private String tenderdate;
    private String description;
    private String status;

    @ManyToOne
    @JoinColumn(name= "workid")
    private WorkDetails workDetails;

    @OneToMany(mappedBy = "createTender")
    @JsonIgnore
    private List<Qutation> qutation;


}
