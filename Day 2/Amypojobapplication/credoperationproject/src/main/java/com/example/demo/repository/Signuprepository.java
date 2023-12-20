package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.entity.Signup;

public interface Signuprepository  extends CrudRepository<Signup,Long> {
	boolean existsByUsername(String username);
	boolean existsByEmail(String email);
	Signup findByUsername(String username);

}
