package com.jobseeker.jobseeker.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.jobseeker.jobseeker.Model.Auth;
import com.jobseeker.jobseeker.Serviceimpl.Authserviceimpl;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class Authcontroller {

  @Autowired
  private Authserviceimpl userservice;


  @GetMapping("/getallusers")
  public List<Auth> getAllUsers()
  {
        return userservice.getAllUsers();
  }

  @GetMapping("/getuser/{id}")
  public ResponseEntity<?> getUserById(@PathVariable String id)
  {

    Auth storedUser=userservice.findById(id);
    if(storedUser==null)
    {
      return new ResponseEntity<>("User not found",HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(storedUser,HttpStatus.OK);

  }

  @PostMapping("/register")
  public ResponseEntity<?> userSignup(@RequestBody Auth user) {

    Auth storedUser = userservice.findUser(user.getEmail());
    if (storedUser == null) {
      userservice.signupUser(user);
    } else {
      return new ResponseEntity<>("Sign up failed!", HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<>("Sign up successful!", HttpStatus.OK);
  }

  @PostMapping("/login")
  public ResponseEntity<?> userLogin(@RequestBody Auth user) {

    Auth storedUser = userservice.findUser(user.getEmail());
    if (user.getEmail().equals(storedUser.getEmail()) && storedUser.getPassword().equals(user.getPassword())) {


      return new ResponseEntity<>(storedUser, HttpStatus.OK);
    }

    return new ResponseEntity<>("Login Failed", HttpStatus.BAD_REQUEST);

  }

}
