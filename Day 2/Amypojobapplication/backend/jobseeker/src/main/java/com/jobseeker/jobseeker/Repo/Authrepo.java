package com.jobseeker.jobseeker.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobseeker.jobseeker.Model.Auth;

public interface Authrepo extends JpaRepository<Auth, String> {


  public Auth findByEmail(String email);

}
