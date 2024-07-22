package com.example.govttenderapi.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Qutation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int qutationid;
    private String tenderamt;
    private String applydate;
    private String status;

    @ManyToOne
    @JoinColumn(name= "tenderid")
    private CreateTender createTender;

    @ManyToOne
    @JoinColumn(name= "bidderid")
    private BidderRegistration bidderRegistration;
}
