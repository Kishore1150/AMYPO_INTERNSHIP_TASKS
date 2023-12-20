package com.jobseeker.jobseeker.Serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobseeker.jobseeker.Model.Auth;
import com.jobseeker.jobseeker.Repo.Authrepo;

@Service
public class Authserviceimpl {

  @Autowired
  private Authrepo repo;

  public Auth findUser(String email) {
    return repo.findByEmail(email);
  }

  public void signupUser(Auth user) {
    repo.save(user);
  }

  public List<Auth> getAllUsers() {
    return repo.findAll();
  }

  public Auth findById(String id) {
    return repo.findById(id).get();
  }

}
