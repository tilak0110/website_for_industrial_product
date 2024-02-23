package com.example.demo.services;


import java.util.Optional;

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
	public Customer getCustomerById(int cid)
	{
		Customer cus= repo2.findById(cid);
		return cus;
		
	}

	public Customer getById(int loginid)
	{
		return repo2.getCustByLoginId(loginid);
	}
	public void verifyemail(int logid) {
		repo.verifyemail(logid,true);
		
	}
	public boolean checkEmail(String email) {
		if(repo.existEmail(email)!=null) {
			return true;
		}else {
			return false;
		}		
	}
	public void updatecustomer(Customer customer) {
		System.out.println(customer);
		int customer_id = customer.getCustomer_id();
		String f_name= customer.getFirst_name();
        String last_name= customer.getLast_name();
        String address= customer.getAddress();
        long phone_no= customer.getPhone_no();
        String email= customer.getEmail();
        String city= customer.getCity();
        String state= customer.getState();
        repo2.updateCustomer(f_name, last_name, address, phone_no, email, city, state, customer_id);
	}
	public Customer getCustomer(int loginid) {
		// TODO Auto-generated method stub
		
		return repo2.getCustByLoginId(loginid);
	}
	public Login getByLoginId(int loginid) {
		Login l=null;
		Optional<Login> optional=repo.findById(loginid);
		try {
			l=optional.get();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return l;
	}
	public Login getByLoginUsername(String username) {
		return repo.getbyUsername(username);
	}
	public int changePassword(String username, String newPassword) {
		return repo.changepassword(username,newPassword);
		
	}
	
}
