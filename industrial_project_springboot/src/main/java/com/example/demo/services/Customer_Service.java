package com.example.demo.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Customer;
import com.example.demo.entities.Login;
import com.example.demo.repositories.Customer_Repo;
import com.example.demo.repositories.Login_Repo;
@Service
public class Customer_Service {
	@Autowired
	Login_Repo repo;
	@Autowired
	Customer_Repo repo2;
	public void saveLogin(Login login,Customer cus)
	{
		repo.save(login);
	   cus.setLogin_id(login);
		repo2.save(cus);
	}
}
