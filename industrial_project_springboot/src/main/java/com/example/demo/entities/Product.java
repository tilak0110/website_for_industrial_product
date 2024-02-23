package com.example.demo.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "products")
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int productid;
	@Column
	String productname;
	@Column
	float price;
	@Column
	int stock;
	@Column
	String description;
	@ManyToOne
	@JoinColumn(name = "categoryid")
	Category category;
	@ManyToOne
	@JoinColumn(name = "sid")
	Seller seller;
	public Product() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Product(int productid, String productname, float price, int stock, String description, Category category,
			Seller seller) {
		super();
		this.productid = productid;
		this.productname = productname;
		this.price = price;
		this.stock = stock;
		this.description = description;
		this.category = category;
		this.seller = seller;
	}
	public Product(String productname, float price, int stock, String description, Category category, Seller seller) {
		super();
		this.productname = productname;
		this.price = price;
		this.stock = stock;
		this.description = description;
		this.category = category;
		this.seller = seller;
	}
	public int getProductid() {
		return productid;
	}
	public void setProductid(int productid) {
		this.productid = productid;
	}
	public String getProductname() {
		return productname;
	}
	public void setProductname(String productname) {
		this.productname = productname;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public int getStock() {
		return stock;
	}
	public void setStock(int stock) {
		this.stock = stock;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Category getCategory() {
		return category;
	}
	public void setCategory(Category category) {
		this.category = category;
	}
	public Seller getSeller() {
		return seller;
	}
	public void setSeller(Seller seller) {
		this.seller = seller;
	}
	@Override
	public String toString() {
		return "Product [productid=" + productid + ", productname=" + productname + ", price=" + price + ", stock="
				+ stock + ", description=" + description + ", categoryid=" + category + ", sid=" + seller + "]";
	}
	
}
