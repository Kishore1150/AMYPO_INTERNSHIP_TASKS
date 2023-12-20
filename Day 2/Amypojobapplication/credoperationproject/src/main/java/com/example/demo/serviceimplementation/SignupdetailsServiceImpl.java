package com.example.demo.serviceimplementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Signup;
import com.example.demo.repository.Signuprepository;
import com.example.demo.service.SignupInterface;

@Service
public class SignupdetailsServiceImpl implements SignupInterface{

	
	
	@Autowired 
	private Signuprepository signuprep;
	
	
	@Override
	public Signup saveAllUsers(Signup signup) {
		return signuprep.save(signup);
	}

	@Override
	public List<Signup> getAllUsers() {
		return (List<Signup>) signuprep.findAll();
	}

	@Override
	public Signup updateAllusers(Signup signup) {
		return signuprep.save(signup);
	}

	@Override
	public void deteleAllusers(long id) {
		 signuprep.deleteById(id);
	}

	
	@Override
	public boolean checkUsername(String username) {
		return signuprep.existsByUsername(username);
	}

	@Override
	public boolean checkEmail(String email) {
		// TODO Auto-generated method stub
		return signuprep.existsByEmail(email);
	}

	
	
	
}
