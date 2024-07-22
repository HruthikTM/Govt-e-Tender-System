package com.example.govttenderapi.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Emaildata {
    private String recipient;
    private String subject;
    private String message;
    private int otp;
}

