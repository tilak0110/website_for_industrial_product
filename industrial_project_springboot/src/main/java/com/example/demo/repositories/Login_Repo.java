package com.example.demo.repositories;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Login;
@Repository
@Transactional
public interface Login_Repo extends JpaRepository<Login, Integer> {
	
<<<<<<< HEAD
	@Query("select l from Login l where username = :username and password = :password and flag = true")
	Login findById(String username, String password);
	@Modifying
	@Query("update Login l set flag= :flag where login_id= :login_id")
	void updateFlag(int login_id,boolean flag);
	@Modifying
	@Query("update Login l set flag= null where login_id= :login_id")
	void removeFlag(int login_id);	
	@Modifying
	@Query("update Login l set verify_mail= :flag where login_id= :login_id")
	void verifyemail(int login_id,boolean flag);
	
	@Query("select l from Login l where username = :username")
	Login existEmail(String username);
	
	@Query("select l from Login l where username = :username")
	Login getbyUsername(String username);
	
	@Modifying
	@Query("update Login l set password = :password where username = :username")
	int changepassword(String username, String password);

=======
	@Query("select l from Login l where username = :username and password = :password and flag= :flag")
	Login findById(String username, String password,boolean flag);
	@Modifying
	@Query("update Login l set flag= :flag where login_id= :login_id")
	void updateFlag(int login_id,boolean flag);
>>>>>>> 633a15d0408cc7d512cbf37d2739b25a32a27193
	

}
