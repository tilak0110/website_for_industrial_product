package com.example.demo.repositories;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Product;
@Repository
@Transactional
public interface ProductRepo extends JpaRepository<Product, Integer> {
	@Query("select p from Product p where sid= :selid")
	List<Product> findBySeller(long selid);
	@Query("select p from Product p where categoryid= :cid")
	List<Product> findByCategory(int cid);
	@Modifying
    @Query("update Product p set p.price = :price, p.description = :description, p.stock = :stock where p.productid = :productid")
	void updateProduct(String description, float price, int stock,  int productid);
	@Modifying
	@Query("update Product p set p.stock= :stock where p.productid= :productid")
	void updateStock(int stock, int productid);
	@Modifying
	@Query("update Product p set picture= :photo where productid= :id")
	public int uploadPhoto(int id,byte[] photo);
	@Query("select p.productname from Product p where p.productname like CONCAT(:name, '%')")
	List<String> getSearch(@Param("name")String name);
	@Modifying
	@Query("update Product p set p.stock= p.stock-1 where p.productid= :productid")
	void updateStockBy(int productid);
	@Query("select p from Product p where productid= :pid")
	Product findById(int pid);
	@Modifying
	@Query("update Product p set p.stock= :stock where p.productid= :productid")
	void manageStock(int productid, int stock);
	
}
