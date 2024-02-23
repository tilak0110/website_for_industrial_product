package com.example.demo.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int orderid;
	@Column
	String address;
	@Column
	String city;
	@Column
	String state;
	@Column
	String paymentmode;
	@Column
	float price;
	@OneToOne
	@JoinColumn(name = "cid")
	Customer customer;
	@OneToMany(mappedBy = "order")
	List<OrderItem> orderitem;
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	public Order() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Order(int orderid, String address, String city, String state, String paymentmode, float price,
			Customer customer, List<OrderItem> orderitem) {
		super();
		this.orderid = orderid;
		this.address = address;
		this.city = city;
		this.state = state;
		this.paymentmode = paymentmode;
		this.price = price;
		this.customer = customer;
		this.orderitem = orderitem;
	}
	public Order(String address, String city, String state, String paymentmode, float price, Customer customer,
			List<OrderItem> orderitem) {
		super();
		this.address = address;
		this.city = city;
		this.state = state;
		this.paymentmode = paymentmode;
		this.price = price;
		this.customer = customer;
		this.orderitem = orderitem;
	}
	@Override
	public String toString() {
		return "Order [orderid=" + orderid + ", address=" + address + ", city=" + city + ", state=" + state
				+ ", paymentmode=" + paymentmode + ", price=" + price + ", customer=" + customer + ", orderitem="
				+ orderitem + "]";
	}
	public int getOrderid() {
		return orderid;
	}
	public void setOrderid(int orderid) {
		this.orderid = orderid;
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
	public String getPaymentmode() {
		return paymentmode;
	}
	public void setPaymentmode(String paymentmode) {
		this.paymentmode = paymentmode;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public List<OrderItem> getOrderitem() {
		return orderitem;
	}
	public void setOrderitem(List<OrderItem> orderitem) {
		this.orderitem = orderitem;
	}
	
	
}
