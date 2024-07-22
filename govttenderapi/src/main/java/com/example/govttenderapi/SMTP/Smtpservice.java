package com.example.govttenderapi.SMTP;

import com.example.govttenderapi.DTO.Emaildata;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class Smtpservice {

    static int token;

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}") private String sender;

    public String sendMail(@RequestBody Emaildata details)
    {

        MimeMessage mimeMessage=javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper;

        try {
            mimeMessageHelper=new MimeMessageHelper(mimeMessage,true);
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(details.getRecipient());
            mimeMessageHelper.setText(details.getMessage());
            mimeMessageHelper.setSubject(details.getSubject());

            javaMailSender.send(mimeMessage);
            return "Mail sent successfully";
        }

        catch (MessagingException e){
            return "Error while sending mail!!!";
        }

    }

    public String sendotp(@RequestBody Emaildata details)
    {

        MimeMessage mimeMessage=javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper;

        try {
            mimeMessageHelper=new MimeMessageHelper(mimeMessage,true);
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(details.getRecipient());
            mimeMessageHelper.setText(details.getMessage());
            mimeMessageHelper.setSubject(details.getSubject());
            token=details.getOtp();

            javaMailSender.send(mimeMessage);
            return "Mail sent successfully";
        }

        catch (MessagingException e){
            return "Error while sending mail!!!";
        }

    }

    public String chkotp(@RequestBody Emaildata details)
    {
        if(details.getOtp()==token)
            return "Correct Otp";
        else
            return "Incorrect Otp";
    }

}
