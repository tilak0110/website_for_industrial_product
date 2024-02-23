package com.example.demo.controllers;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Cart;
import com.example.demo.entities.Customer;
import com.example.demo.entities.Product;
import com.example.demo.services.CartService;
import com.example.demo.services.Customer_Service;
import com.example.demo.services.ProductService;

@RestController
@RequestMapping
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {
	@Autowired
	CartService csr;
	@Autowired
	ProductService psr;
	@Autowired
	Customer_Service cser;
	@GetMapping("/addToCart")
	public Cart addtoCart(@RequestParam int pid,@RequestParam int cid,@RequestParam int qty)
	{
		System.err.println(qty);
		Customer c= cser.getCustomerById(cid);
		Product p=psr.getProduct(pid);
		Cart cr=csr.addCart(new Cart(p,qty,c));
		return cr;
	}
	@GetMapping("/getitems/{customer_id}")
	public List<Cart> viewCart(@PathVariable int customer_id)
	{
		System.out.println(customer_id);
		List<Cart> carts= csr.viewCart(customer_id);
		return carts;
	}
	@DeleteMapping("/delitem/{orderid}")
	public void deleteItem(@PathVariable int orderid)
	{
		System.out.println(orderid);
		csr.deleteItem(orderid);
	}
}
