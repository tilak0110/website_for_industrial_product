package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import com.example.demo.entities.Login;
import com.example.demo.entities.Seller;

public class Seller_Wrap {
	@Autowired
	Seller seller;
	@Autowired
	Login login;
	public Seller_Wrap() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Seller_Wrap(Seller seller, Login login) {
		super();
		this.seller = seller;
		this.login = login;
	}
	@Override
	public String toString() {
		return "Seller_Wrap [seller=" + seller + ", login=" + login + "]";
	}
	public Seller getSeller() {
		return seller;
	}
	public void setSeller(Seller seller) {
		this.seller = seller;
	}
	public Login getLogin() {
		return login;
	}
	public void setLogin(Login login) {
		this.login = login;
	}
	
}
