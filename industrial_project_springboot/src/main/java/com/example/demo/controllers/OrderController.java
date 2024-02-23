package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Cart;
import com.example.demo.entities.Customer;
import com.example.demo.entities.Order;
import com.example.demo.entities.OrderItem;
import com.example.demo.entities.OrderWrap;
import com.example.demo.entities.Product;
import com.example.demo.services.CartService;
import com.example.demo.services.OrderService;
import com.example.demo.services.ProductService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {
	@Autowired
	OrderService ser;
	@Autowired
	ProductService psr;
	@Autowired
	CartService csr;
	@PostMapping("/create")
	public void createOrder(@RequestBody OrderWrap wrap)
	{
		System.out.println(wrap);
		Order order= wrap.getOrder();
		System.out.println(order);
		List<Cart> cart= wrap.getCartitems();
		Cart cart2= cart.get(0);
		Customer cus= cart2.getCustomer();
		String email= cus.getEmail();		
		order.setCustomer(cus);
		ser.saveOrder(order);
		for(Cart c : cart)
		{
			Product p= c.getProduct();
			OrderItem item= new OrderItem();
			item.setOrder(order);
			item.setProduct(p);
			ser.saveOrderItems(item);
			int quantity= c.getQuantity();
			int stock= p.getStock();
			psr.manageStock(p.getProductid(), stock-quantity);
			csr.deleteItem(c.getId());
		}
		System.out.println("Order Placed of "+order.getPrice()+"/n Order will be delivered at "+order.getAddress()+", "+order.getCity()+", "+order.getCity());
	}
	@GetMapping("/getorders/{custid}")
	public List<OrderItem> getOrders(@PathVariable int custid)
	{
		List<OrderItem> items= ser.findAllByCustomer(custid);
		return items;
	}
}
