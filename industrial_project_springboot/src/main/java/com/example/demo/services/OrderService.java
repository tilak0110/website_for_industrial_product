package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Order;
import com.example.demo.entities.OrderItem;
import com.example.demo.repositories.OrderItemRepo;
import com.example.demo.repositories.OrderRepo;

@Service
public class OrderService {
	@Autowired
	OrderRepo repo;
	@Autowired
	OrderItemRepo repo2;
	public Order saveOrder(Order o)
	{
		return repo.save(o);
	}
	public OrderItem saveOrderItems(OrderItem item)
	{
		return repo2.save(item);
	}
	public List<OrderItem> findAllByCustomer(int custid) {
		// TODO Auto-generated method stub
		List<OrderItem> items= repo2.findByProducts(custid);
		return items;
	}
	
}
