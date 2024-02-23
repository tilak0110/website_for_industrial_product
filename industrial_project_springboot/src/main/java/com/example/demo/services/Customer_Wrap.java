package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.entities.Customer;
import com.example.demo.entities.Login;

public class Customer_Wrap {
	@Autowired
	Customer customer;
	@Autowired
	Login login;
	public Customer_Wrap() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Customer_Wrap(Customer customer, Login login) {
		super();
		this.customer = customer;
		this.login = login;
	}
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	public Login getLogin() {
		return login;
	}
	public void setLogin(Login login) {
		this.login = login;
	}
	

}
