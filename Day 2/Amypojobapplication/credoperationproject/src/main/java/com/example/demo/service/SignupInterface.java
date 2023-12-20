package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Signup;

public interface SignupInterface {
	
	
	//to save usersignup details
	public Signup saveAllUsers(Signup signup);
	
	
	//to get all usersignup details
	public List<Signup>  getAllUsers();
	
	
	//to update all usersignup details
	
	public Signup updateAllusers(Signup signup);
	
	
	//to delete usersignup details
	
	public void deteleAllusers(long id);
	
	public boolean checkUsername(String username);
	public boolean checkEmail(String email);
	
	
	
	

}
