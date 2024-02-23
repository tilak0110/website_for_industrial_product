package com.example.demo.controllers;


import java.security.SecureRandom;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.ChangePasswordRequest;
import com.example.demo.entities.Customer;
import com.example.demo.entities.HtmlTextPage;
import com.example.demo.entities.Login;
import com.example.demo.entities.Seller;
import com.example.demo.services.Customer_Wrap;
import com.example.demo.services.Seller_Service;
import com.example.demo.services.Seller_Wrap;
import com.example.demo.services.Customer_Service;


@RestController
@RequestMapping
@CrossOrigin(origins = "http://localhost:3000")
public class Registration_Controller {
	@Autowired
	Customer_Service login;
	@Autowired
	Seller_Service seller;
	@Autowired
	JavaMailSender sender;
	 private static final String OTP_CHARACTERS = "0123456789";
	 private static final int OTP_LENGTH = 6;
	
	@GetMapping("/getCustomer")
	public Customer getOneCustomer(@RequestParam int loginid) {
		return login.getById(loginid);
	}@GetMapping("/getUser")
	public Seller getseller(@RequestParam int loginid)
	{
		Seller s=seller.getSeller(loginid);
		return s;
	}
	
	@GetMapping("/getSeller")
	public Seller getOneSeller(@RequestParam int loginid) {
		return seller.getById(loginid);
	}
	
	@PostMapping("/customer")
	public ResponseEntity<Object> registerCustomer(@RequestBody Customer_Wrap wrap)
	{
		try
		{
			Login log= wrap.getLogin();
			Customer cus= wrap.getCustomer();
			login.saveLogin(log, cus);
			SimpleMailMessage mailMsg= new SimpleMailMessage();
			 String verificationUrl = "http://localhost:8080/verifyemail/" + log.getLogin_id();

	            // Prepare HTML content for the email
	            String htmlContent = "Congratulations You Registered Successfully "
	                                +  verificationUrl + " Click on this link to verify your email";

	
	            mailMsg.setFrom("pagememe0110@gmail.com");
	            mailMsg.setTo(log.getUsername());
	            mailMsg.setSubject("Registered In Industrial Nexus");
	            mailMsg.setText(htmlContent);
	            sender.send(mailMsg);
			return ResponseEntity.status(HttpStatus.CREATED).body(wrap);
		}
		catch(Exception e)
		{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error saving data: "+e.getMessage());
		}
		
	}
	@GetMapping("/verifyemail/{logid}")
	public String verifyEmail(@PathVariable("logid") int logid) {
		login.verifyemail(logid);
		HtmlTextPage h1=new HtmlTextPage();
		return h1.getHtml();
	}
	
	@PostMapping("/seller")
	public ResponseEntity<Object> registerSeller(@RequestBody Seller_Wrap wrap)
	{
		try
		{
			Login log= wrap.getLogin();
			Seller sel= wrap.getSeller();
			seller.saveLogin(log, sel);
			SimpleMailMessage mailMsg= new SimpleMailMessage();
			 String verificationUrl = "http://localhost:8080/verifyemail/" + log.getLogin_id();
			 String htmlContent = "Congratulations You Registered Successfully "
                     +  verificationUrl + " Click on this link to verify your email";
			 mailMsg.setFrom("pagememe0110@gmail.com");
	            mailMsg.setTo(log.getUsername());
	            mailMsg.setSubject("Registered In Industrial Nexus");
	            mailMsg.setText(htmlContent);
	            sender.send(mailMsg);
			return ResponseEntity.status(HttpStatus.OK).body(wrap);
		}
		catch(Exception e)
		{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error saving data: "+e.getMessage());
		}
		
	}
	@PostMapping("/login")
	public ResponseEntity<Login> login(@RequestBody Map<String, String> credentials) {
	    String username = credentials.get("username");
	    String password = credentials.get("password");
	    
	    System.out.println(username + " " + password);
	    
	    Login res = seller.getOne(username, password);
	    
	    if (res == null) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
	    } else {
	        return ResponseEntity.status(HttpStatus.OK).body(res);
	    }
	}

	@PostMapping("/updatecustomer")
	public void updateCustomer(@RequestBody Customer customer) {
		login.updatecustomer(customer);
	}
	@PostMapping("/updateseller")
	public void updateSeller(@RequestBody Seller sellers) {
		seller.updateseller(sellers);
	}
	@GetMapping("/getverify")
	public List<Seller> getSellers()
	{
		List<Seller> sellers= seller.getSellers();
				return sellers;
	}
	@PostMapping("/updateflag")
	public void updateFlag(@RequestBody Login login) {
		//TODO: process POST request
		System.out.println(login);
		
		seller.updateFlag(login);	
	}
	@PostMapping("/removeflag")
	public void removeFlag(@RequestBody Login login) {
		//TODO: process POST request
		System.out.println(login);
		
		seller.removeFlag(login);	
	}
	 public static String generateOTP() {
	        SecureRandom random = new SecureRandom();
	        StringBuilder otp = new StringBuilder(OTP_LENGTH);
	        
	        for (int i = 0; i < OTP_LENGTH; i++) {
	            int randomIndex = random.nextInt(OTP_CHARACTERS.length());
	            otp.append(OTP_CHARACTERS.charAt(randomIndex));
	        }
	        
	        return otp.toString();
	 }
	 @PostMapping("/generateotp")
	 public ResponseEntity<String> generateOtp(@RequestBody Map<String, String> requestBody) {
	     String username = requestBody.get("username");
	     Login log1 = login.getByLoginUsername(username);
	     String email = "";
	     if (log1 != null) {
	         email = log1.getUsername();
	     }

	     if (!email.isEmpty()) {
	         SimpleMailMessage mailMsg = new SimpleMailMessage();
	         String otp = generateOTP();
	         String msg = "Your OTP to change password is " + otp + "\n Do Not share Your OTP.";
	         mailMsg.setFrom("pagememe0110@gmail.com");
	         mailMsg.setTo(email);
	         mailMsg.setSubject("Registered In Industrial Nexus");
	         mailMsg.setText(msg);
	         sender.send(mailMsg);
	         return ResponseEntity.ok().body(otp);
	     } else {
	         return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Username not found in the database");
	     }
	 }
	 @PostMapping("/changepassword")
	    public String changePassword(@RequestBody ChangePasswordRequest request) {
	       
	        String username = request.getUsername();
	        String newPassword = request.getPassword();
	        
	        int num=login.changePassword(username,newPassword);
	        if(num>0)	        
	        return "Password changed successfully for user: " + username;
	        else
	        	return "Something went wrong please Try again later";
	    }

	
	
	 
	
}
