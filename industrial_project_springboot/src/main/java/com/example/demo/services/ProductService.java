package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Category;
import com.example.demo.entities.Product;
import com.example.demo.repositories.CategoryRepo;
import com.example.demo.repositories.ProductRepo;

@Service
public class ProductService {
	@Autowired
	ProductRepo pr;
	@Autowired
	CategoryRepo cr;
	public void saveCat(Category cat)
	{
		cr.save(cat);
	}
	public List<Category> getAllCats() {
		// TODO Auto-generated method stub
		return cr.findAll();
		
	}
	public Product getProduct(int pid)
	{
		Product p= pr.findById(pid);
		return p;
	}
	public void savePro(Product pr2) {
		// TODO Auto-generated method stub
		try {
			//Seller seller= pr2.getSeller();
			System.out.println("in service");
			
		pr.save(pr2);
		}catch(Exception e)
		{
			e.getMessage();
		}
	}
	public List<Product> getPros(long seller_id) {
		List<Product> list= pr.findBySeller(seller_id);
		return list;
	}
	public List<Product> getAllPros() {
		// TODO Auto-generated method stub
		List<Product>list= pr.findAll();
		return list;
	}
	public void deletePro(int productid) {
		// TODO Auto-generated method stub
		pr.deleteById(productid);
	}
	public List<Product> getByCategories(int cid) {
		// TODO Auto-generated method stub
		List<Product> list= pr.findByCategory(cid);
		return list;
	}
	public void updateproduct(Product product) {
		// TODO Auto-generated method stub
		System.out.println(product);
		int productid = product.getProductid();
        String description= product.getDescription();
        float price= product.getPrice();
        int stock= product.getStock();
        pr.updateProduct(description,price,stock,productid);
	}
	public void updateStock(Product product) {
		// TODO Auto-generated method stub
		System.out.println(product);
		int productid = product.getProductid();
        int stock= product.getStock();
        pr.updateStock(stock,productid);
	}
	public boolean upload(int id,byte [] photo)
	{
		if(pr.uploadPhoto(id, photo)==1)
			return true;
		else
			return false;
	}
	public List<String> getSearch(String name) {
		// TODO Auto-generated method stub
		
		List<String> list= pr.getSearch(name);
		return list;
	}
	public void maintainStock(int productid) {
		// TODO Auto-generated method stub
		pr.updateStockBy(productid);
	}
	public void manageStock(int productid,int stock)
	{
		pr.manageStock(productid, stock);
	}
			
}
