package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entities.Category;
import com.example.demo.entities.Product;
import com.example.demo.entities.Seller;
import com.example.demo.services.ProductService;

@RestController
@RequestMapping
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
	@Autowired
	ProductService pser;
	
	@PostMapping("/addcat")
	public Category saveCategory(@RequestBody Category cat)
	{
		try
		{
			System.out.println(cat);
			pser.saveCat(cat);
		}
		catch(Exception e)
		{
			e.getMessage();
		}
		return cat;
	}
	@GetMapping("/getcats")
	public List<Category> getallCat()
	{
		List<Category> cats= pser.getAllCats();
		return cats;
	}
	@PostMapping("/pro")
	public Product saveProduct(@RequestBody Product pr)
	{
		try
		{   
			System.out.println(pr);
			pser.savePro(pr);
		}
		catch(Exception e)
		{
			e.getMessage();
		}
		return pr;
	}
	@GetMapping("/getpro/{seller_id}")
	public List<Product> getProduct(@PathVariable long seller_id)
	{
		System.out.println(seller_id);
		List<Product> list= pser.getPros(seller_id);
		return list;
	}
	@GetMapping("/getsearch")
	public List<String> getNames(@RequestParam String name)
	{
		List<String> list= pser.getSearch(name);
		return list;
	}
	
	@DeleteMapping("/delpro/{productid}")
	public void deletePro(@PathVariable int productid)
	{
		System.out.println(productid);
		pser.deletePro(productid);
	}
	@GetMapping("/getproducts")
	public List<Product> getAllProduct()
	{
		List<Product> list= pser.getAllPros();
		return list;
	}
	@GetMapping("/getbycat")
	public List<Product> getProduct(@RequestParam int cid)
	{
		System.out.println(cid);
		List<Product> list= pser.getByCategories(cid);
		return list;
	}
	@PostMapping("/updatepro")
	public void updateProduct(@RequestBody Product product) {
		System.out.println("In controller"+product);
		pser.updateproduct(product);
	}
	@PostMapping("/updatestock")
	public void updateStock(@RequestBody Product product) {
		System.out.println("In controller"+product);
		pser.updateproduct(product);
	}
	@PostMapping(value="/uploadImage/{did}")
	public boolean uploadImage(@PathVariable("did") int did,@RequestBody MultipartFile file)
	{
		boolean flag=true;
		try
		{
			flag= pser.upload(did, file.getBytes());
		}
		catch(Exception e)
		{
			flag=false;
		}
		return flag;
	}
}
