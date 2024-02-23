package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Cart;
import com.example.demo.repositories.CartRepo;

@Service
public class CartService {
	@Autowired
	CartRepo crp;
	

	public Cart addCart(Cart cart) {
		// TODO Auto-generated method stub
		Cart crt=crp.save(cart);
		return crt;
	}

	public List<Cart> viewCart(int customer_id) {
		// TODO Auto-generated method stub
		List<Cart> carts= crp.findByCustomerId(customer_id);
		return carts;
	}

	public void deleteItem(int cid) {
		// TODO Auto-generated method stub
		crp.deleteById(cid);
	}
	
}
