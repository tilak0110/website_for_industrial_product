package com.example.demo.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="orderitem")
public class OrderItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int orderitem;
	@OneToOne
	@JoinColumn(name="pid")
	Product product;
	@ManyToOne
	@JoinColumn(name = "orderid")
	Order order;
	public OrderItem() {
		super();
		// TODO Auto-generated constructor stub
	}
	public OrderItem(int orderitem, Product product, Order order) {
		super();
		this.orderitem = orderitem;
		this.product = product;
		this.order = order;
	}
	public OrderItem(Product product, Order order) {
		super();
		this.product = product;
		this.order = order;
	}
	@Override
	public String toString() {
		return "OrderItem [orderitem=" + orderitem + ", product=" + product +  "]";
	}
	public int getOrderitem() {
		return orderitem;
	}
	public void setOrderitem(int orderitem) {
		this.orderitem = orderitem;
	}
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public Order getOrder() {
		return order;
	}
	public void setOrder(Order order) {
		this.order = order;
	}
	
	
}
