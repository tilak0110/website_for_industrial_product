package com.example.demo.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import javax.persistence.CascadeType;

@Entity
public class Customer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int customer_id;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "login_id")
	Login login;
	@Column
	String address;
	@Column
	long phone_no;
	@Column
	String email;
	@Column
	String first_name;
	@Column
	String last_name;
	@Column
	String city;
	@Column
	String state;
	
	public Customer() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Customer(int customer_id, Login login, String address, long phone_no, String email, String first_name,
			String last_name, String city, String state) {
		super();
		this.customer_id = customer_id;
		this.login= login;
		this.address = address;
		this.phone_no = phone_no;
		this.email = email;
		this.first_name = first_name;
		this.last_name = last_name;
		this.city = city;
		this.state = state;
	}
	public Customer(Login login, String address, long phone_no, String email, String first_name, String last_name,
			String city, String state) {
		super();
		this.login= login;
		this.address = address;
		this.phone_no = phone_no;
		this.email = email;
		this.first_name = first_name;
		this.last_name = last_name;
		this.city = city;
		this.state = state;
	}
	public String toString() {
		return "Customer [customer_id=" + customer_id + ", login_id=" + login + ", address=" + address
				+ ", phone_no=" + phone_no + ", email=" + email + ", firstname=" + first_name + ", lastname=" + last_name
				+ ", city=" + city + ", state=" + state + "]";
	}
	public int getCustomer_id() {
		return customer_id;
	}
	public void setCustomer_id(int customer_id) {
		this.customer_id = customer_id;
	}
	public Login getLogin() {
		return login;
	}
	public void setLogin_id(Login login) {
		this.login = login;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public long getPhone_no() {
		return phone_no;
	}
	public void setPhone_no(long phone_no) {
		this.phone_no = phone_no;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getFirst_name() {
		return first_name;
	}
	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}
	public String getLast_name() {
		return last_name;
	}
	public void setLname(String last_name) {
		this.last_name = last_name;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}

	
	
}
