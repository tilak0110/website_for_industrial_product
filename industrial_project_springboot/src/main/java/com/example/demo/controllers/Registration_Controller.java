package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Customer;
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
	
	@PostMapping("/customer")
	public ResponseEntity<Object> registerCustomer(@RequestBody Customer_Wrap wrap)
	{
		try
		{
			Login log= wrap.getLogin();
			Customer cus= wrap.getCustomer();
			login.saveLogin(log, cus);
			return ResponseEntity.status(HttpStatus.CREATED).body(wrap);
		}
		catch(Exception e)
		{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error saving data: "+e.getMessage());
		}
		
	}
	
	@PostMapping("/seller")
	public ResponseEntity<Object> registerSeller(@RequestBody Seller_Wrap wrap)
	{
		try
		{
			Login log= wrap.getLogin();
			Seller sel= wrap.getSeller();
			seller.saveLogin(log, sel);
			return ResponseEntity.status(HttpStatus.OK).body(wrap);
		}
		catch(Exception e)
		{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error saving data: "+e.getMessage());
		}
		
	}
	@GetMapping("/login")
	public ResponseEntity<Login> login(@RequestParam String username,@RequestParam String password)
	{
		 System.out.println(username+" "+password);
		Login res= seller.getOne(username, password);
		if(res==null)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		else
			return ResponseEntity.status(HttpStatus.OK).body(res);
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
	
	
}
