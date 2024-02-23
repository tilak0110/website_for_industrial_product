package com.example.demo.repositories;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.OrderItem;
@Repository
@Transactional
public interface OrderItemRepo extends JpaRepository<OrderItem, Integer> {
	@Query("select o from OrderItem o where pid= :custid")
	List<OrderItem> findByProducts(int custid);

}
