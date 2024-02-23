package com.example.demo.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
public class Login {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int login_id;
	@Column
	String username;
	@Column
	String password;
	@Column
	int role_id;
	@Column
	boolean flag;
	@Column
	boolean verify_mail;
	
	public Login() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Login(int login_id, String username, String password, int role_id, boolean flag, boolean verify_mail) {
		super();
		this.login_id = login_id;
		this.username = username;
		this.password = password;
		this.role_id = role_id;
		this.flag = flag;
		this.verify_mail = verify_mail;
	}
	public Login(String username, String password, int role_id, boolean flag, boolean verify_mail) {
		super();
		this.username = username;
		this.password = password;
		this.role_id = role_id;
		this.flag = flag;
		this.verify_mail = verify_mail;
	}
	public int getLogin_id() {
		return login_id;
	}
	public void setLogin_id(int login_id) {
		this.login_id = login_id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public int getRole_id() {
		return role_id;
	}
	public void setRole_id(int role_id) {
		this.role_id = role_id;
	}
	public boolean isFlag() {
		return flag;
	}
	public void setFlag(boolean flag) {
		this.flag = flag;
	}
	public boolean isVerify_mail() {
		return verify_mail;
	}
	public void setVerify_mail(boolean verify_mail) {
		this.verify_mail = verify_mail;
	}
	@Override
	public String toString() {
		return "Login [login_id=" + login_id + ", username=" + username + ", password=" + password + ", role_id="
				+ role_id + ", flag=" + flag + ", verify_mail=" + verify_mail + "]";
	}
	
	
	
}
