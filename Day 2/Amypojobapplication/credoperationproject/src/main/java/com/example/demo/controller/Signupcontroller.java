package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Signup;
import com.example.demo.repository.Signuprepository;
import com.example.demo.serviceimplementation.SignupdetailsServiceImpl;

@RestController
@CrossOrigin(origins = "*")
public class Signupcontroller {

	@Autowired
	private SignupdetailsServiceImpl signupservice;

	@Autowired
	private Signuprepository rep;

	// get users
	@GetMapping(value = "getusers")
	public List<Signup> getallusers() {
		return signupservice.getAllUsers();
	}

	// to call save method or to save new users
//		@PostMapping(value="saveusers")
//		public Signup saveUsers(@RequestBody Signup signup) {
//			signupservice.saveAllUsers(signup);
//				
//			
//			return signup;
//		}

	@PostMapping("/saveusers")
	public String adduser(@RequestBody Signup signup) {
		boolean isUsername = signupservice.checkUsername(signup.getUsername());
		boolean isEmail = signupservice.checkEmail(signup.getEmail());
		if (isUsername && isEmail) {
			return "Username and Email already exist";
		} else {
			if (isUsername) {
				return "Username already exists";
			} else if (isEmail) {
				return "Email already exists";

			} else {
				signupservice.saveAllUsers(signup);
				return " You Are Signuped Successfully";
			}
		}
	}

	@PostMapping("/login")
	public String login(@RequestBody Signup signup) throws Exception {
		Signup existingUser = rep.findByUsername(signup.getUsername());

		if (existingUser == null || !existingUser.getPassword().equals(signup.getPassword())) {
			return "Login Failed";
			
		}

		return "Login successful";

	}

	// update new users
	@PutMapping("updateusers")
	public Signup updateusers(@RequestBody Signup signup) {
		return signupservice.updateAllusers(signup);
	}

	// delete users
	@DeleteMapping("deleteuusers")
	public String deleteusers(@RequestParam int id) {
		signupservice.deteleAllusers(id);
		return "Flight detail deleted";
	}

}
