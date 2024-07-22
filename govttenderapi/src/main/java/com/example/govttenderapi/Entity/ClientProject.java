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
public class ClientProject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int projectid;
    private String projectname;
    private String description;
    private String projectdate;
    private String status;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String filepath;

    @ManyToOne
    @JoinColumn(name="clientid")
    private ClientBasic clientBasic;

    @OneToMany(mappedBy = "clientProject")
    @JsonIgnore
    private List<PostComments> postComments;

}
