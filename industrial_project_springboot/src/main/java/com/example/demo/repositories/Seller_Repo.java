package com.example.demo.repositories;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD
import org.springframework.data.jpa.repository.Modifying;
=======
>>>>>>> 633a15d0408cc7d512cbf37d2739b25a32a27193
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Seller;
@Repository
@Transactional
public interface Seller_Repo extends JpaRepository<Seller, Integer> {
	@Query("select s from Seller s where login_id in (select login_id from Login l where flag= :flag)")
	List<Seller> getSellers(boolean flag);
<<<<<<< HEAD
	@Query("select s from Seller s where login_id= :loginid")
	Seller getSellerByLoginId(int loginid);
	
	@Modifying
    @Query("update Seller c set c.first_name = :first_name, c.last_name = :last_name, c.address = :address, c.phone_no = :phone_no, c.email = :email, c.city = :city, c.state = :state where c.seller_id = :seller_id")
	void updateSeller(String first_name, String last_name, String address, long phone_no, String email, String city,String state, int seller_id);
	
=======
>>>>>>> 633a15d0408cc7d512cbf37d2739b25a32a27193
}
