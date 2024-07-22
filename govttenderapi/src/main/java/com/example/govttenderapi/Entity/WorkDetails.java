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
public class WorkDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int workid;
    private String workname;
    private String description;
    private String status;

    @ManyToOne
    @JoinColumn(name= "deptid")
    private AddDept addDept;

    @OneToMany(mappedBy = "workDetails")
    @JsonIgnore
    private List<CreateTender> createTender;
}
