package com.example.demo.repositories;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Cart;
@Repository
@Transactional
public interface CartRepo extends JpaRepository<Cart, Integer> {

	@Query("select c from Cart c where customer_id= :cusid")
	List<Cart> findByCustomerId(int cusid);
	@Modifying
	@Query("delete  from Cart c where id= :cid")
	public void deleteById(int cid);

}
