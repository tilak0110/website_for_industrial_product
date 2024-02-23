package com.example.demo.entities;

import java.util.List;

public class OrderWrap {
	List<Cart> cartitems;
	Order order;
	public OrderWrap() {
		super();
		// TODO Auto-generated constructor stub
	}
	public OrderWrap(List<Cart> cartitems, Order order) {
		super();
		this.cartitems = cartitems;
		this.order = order;
	}
	@Override
	public String toString() {
		return "OrderWrap [cartitems=" + cartitems + ", order=" + order + "]";
	}
	public List<Cart> getCartitems() {
		return cartitems;
	}
	public void setCartitems(List<Cart> cartitems) {
		this.cartitems = cartitems;
	}
	public Order getOrder() {
		return order;
	}
	public void setOrder(Order order) {
		this.order = order;
	}
	
	
}
