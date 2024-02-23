package com.example.demo.services;

import java.util.List;

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
	public Seller getById(int loginid)
	{
		return repo2.getSellerByLoginId(loginid);
	}
	public Login getOne(String username,String password)
	{
		
		Login login= repo.findById(username,password);
			//role_id= login.getRole_id();
		return login;
	}
	public List<Seller> getSellers()
	{
		boolean flag=false;
		List<Seller> sellers= repo2.getSellers(flag);
		return sellers;
	}
	
	public void updateFlag(Login login)
	{
		boolean flag=true;
		try
		{
			int login_id= login.getLogin_id();
		repo.updateFlag(login_id,flag);
		
		
		}catch(Exception e){
			e.getMessage();
		}
	}
	public void removeFlag(Login login)
	{
		
		try
		{
			int login_id= login.getLogin_id();
		repo.removeFlag(login_id);
		
		
		}catch(Exception e){
			e.getMessage();
		}
	}
	public Seller getSeller(int loginid) {
		// TODO Auto-generated method stub
		
		return repo2.getSellerByLoginId(loginid);
	}
	public void updateseller(Seller sellers) {
		System.out.println(sellers);
		int seller_id = sellers.getSeller_id();
		String f_name= sellers.getFirst_name();
        String last_name= sellers.getLast_name();
        String address= sellers.getAddress();
        long phone_no= sellers.getPhone_no();
        String email= sellers.getEmail();
        String city= sellers.getCity();
        String state= sellers.getState();
        repo2.updateSeller(f_name, last_name, address, phone_no, email, city, state, seller_id);
		
	}
	
	
	
	
	
}
