package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.entities.Login;
import com.example.demo.entities.Seller;
import com.example.demo.repositories.Login_Repo;
import com.example.demo.repositories.Seller_Repo;
@Service
public class Seller_Service {
	@Autowired
	Login_Repo repo;
	@Autowired
	Seller_Repo repo2;
	public void saveLogin(Login login,Seller sel)
	{
		repo.save(login);
	   sel.setLogin(login);
		repo2.save(sel);
	}
	public Login getOne(String username,String password)
	{
		
		Login login= repo.findById(username,password);
			//role_id= login.getRole_id();
		return login;
	}
}
