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
public class AddDeptHead {
    @Id
    private int dheadid;
    private String dheadname;
    private String password;
    private String email;
    private String pno;
    private String address;

    @ManyToOne
    @JoinColumn(name= "deptid")
    private AddDept addDept;


}
