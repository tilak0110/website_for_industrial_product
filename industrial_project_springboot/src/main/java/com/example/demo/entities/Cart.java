package com.example.demo.entities;
import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "cart")
public class Cart {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	 @ManyToOne(cascade = CascadeType.ALL)
		@JoinColumn(name="productid")
	    private Product product;
	 @Column(name = "Quantity")
	    private int quantity;
	 @ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="customer_id")
	 private Customer customer;
	public Cart() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Cart(int id, Product product, int quantity, Customer customer) {
		super();
		this.id = id;
		this.product = product;
		this.quantity = quantity;
		this.customer = customer;
	}
	public Cart(Product product, int quantity, Customer customer) {
		super();
		this.product = product;
		this.quantity = quantity;
		this.customer = customer;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	@Override
	public String toString() {
		return "Cart [id=" + id + ", product=" + product + ", quantity=" + quantity + ", customer=" + customer + "]";
	}
	 
}