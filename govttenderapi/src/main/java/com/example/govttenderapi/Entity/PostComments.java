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
public class PostComments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentid;
    private String comments;
    private String postdate;


    @ManyToOne
    @JoinColumn(name= "projectid")
    private ClientProject clientProject;
}
