package com.example.demo.repositories;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Seller;
@Repository
@Transactional
public interface Seller_Repo extends JpaRepository<Seller, Integer> {
	@Query("select s from Seller s where login_id in (select login_id from Login l where flag= :flag)")
	List<Seller> getSellers(boolean flag);
}
