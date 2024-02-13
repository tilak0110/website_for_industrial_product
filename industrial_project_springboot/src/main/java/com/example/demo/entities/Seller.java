package com.example.demo.entities;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "seller")
public class Seller {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int seller_id;
	@Column
	private String first_name;
	@Column
	private String last_name;
	@Column
	private String business_name;
	@Column
	private String gst_no;
	@Column
	private String email;
	@Column
	private long phone_no;
	@Column
	private String address;
	@Column
	private String city;
	@Column
	private String state;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "login_id")
	Login login;

	public Seller() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Seller(int seller_id, String first_name, String last_name, String business_name, String gst_no, String email,
			long phone_no, String address, String city, String state, Login login) {
		super();
		this.seller_id = seller_id;
		this.first_name = first_name;
		this.last_name = last_name;
		this.business_name = business_name;
		this.gst_no = gst_no;
		this.email = email;
		this.phone_no = phone_no;
		this.address = address;
		this.city = city;
		this.state = state;
		this.login = login;
	}

	public Seller(String first_name, String last_name, String business_name, String gst_no, String email, long phone_no,
			String address, String city, String state, Login login) {
		super();
		this.first_name = first_name;
		this.last_name = last_name;
		this.business_name = business_name;
		this.gst_no = gst_no;
		this.email = email;
		this.phone_no = phone_no;
		this.address = address;
		this.city = city;
		this.state = state;
		this.login = login;
	}

	@Override
	public String toString() {
		return "Seller [seller_id=" + seller_id + ", first_name=" + first_name + ", last_name=" + last_name
				+ ", business_name=" + business_name + ", gst_no=" + gst_no + ", email=" + email + ", phone_no="
				+ phone_no + ", address=" + address + ", city=" + city + ", state=" + state + ", login=" + login + "]";
	}

	public int getSeller_id() {
		return seller_id;
	}

	public void setSeller_id(int seller_id) {
		this.seller_id = seller_id;
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

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public String getBusiness_name() {
		return business_name;
	}

	public void setBusiness_name(String business_name) {
		this.business_name = business_name;
	}

	public String getGst_no() {
		return gst_no;
	}

	public void setGst_no(String gst_no) {
		this.gst_no = gst_no;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public long getPhone_no() {
		return phone_no;
	}

	public void setPhone_no(long phone_no) {
		this.phone_no = phone_no;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
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

	public Login getLogin() {
		return login;
	}

	public void setLogin(Login login) {
		this.login = login;
	}
	
	
}
