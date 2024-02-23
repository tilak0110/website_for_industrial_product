package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entities.Customer;

@Transactional
@Repository
public interface Customer_Repo extends JpaRepository<Customer, Integer> {
	@Query("select c from Customer c where login_id = :loginid")
	Customer getCustByLoginId(int loginid);
	
	@Modifying
    @Query("update Customer c set c.first_name = :firstName, c.last_name = :lastName, c.address = :address, c.phone_no = :phoneNo, c.email = :email, c.city = :city, c.state = :state where c.customer_id = :customerId")
    int updateCustomer(String firstName, String lastName, String address, long phoneNo, String email, String city, String state, int customerId);
	
	@Query("select c from Customer c where customer_id = :cid")
	Customer findById(int cid);
}
