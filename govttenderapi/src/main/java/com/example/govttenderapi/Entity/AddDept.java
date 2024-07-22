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
public class AddDept {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int deptid;
    private String deptname;
    private String description;

    @OneToMany(mappedBy = "addDept")
    @JsonIgnore
    private List<AddDeptHead> addDeptHead;

    @OneToMany(mappedBy ="addDept")
    @JsonIgnore
    private List<WorkDetails> workDetails;

}
