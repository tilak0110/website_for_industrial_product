package com.example.demo.entities;


public class CartItem {
	private int id;
	private int pid;
	private int quantity;
	private int cid;
	public CartItem() {
		super();
		// TODO Auto-generated constructor stub
	}
	public CartItem(int id, int pid, int quantity, int cid) {
		super();
		this.id = id;
		this.pid = pid;
		this.quantity = quantity;
		this.cid = cid;
	}
	
	public CartItem(int pid, int quantity, int cid) {
		super();
		this.pid = pid;
		this.quantity = quantity;
		this.cid = cid;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getPid() {
		return pid;
	}
	public void setPid(int pid) {
		this.pid = pid;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public int getCid() {
		return cid;
	}
	public void setCid(int cid) {
		this.cid = cid;
	}
	@Override
	public String toString() {
		return "CartItem [id=" + id + ", pid=" + pid + ", quantity=" + quantity + ", cid=" + cid + "]";
	}
    
}
