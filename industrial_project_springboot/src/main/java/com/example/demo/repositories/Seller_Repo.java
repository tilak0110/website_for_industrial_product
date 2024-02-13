package com.example.demo.repositories;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Seller;
@Repository
@Transactional
public interface Seller_Repo extends JpaRepository<Seller, Integer> {

}
