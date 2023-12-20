package com.jobseeker.jobseeker.Serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobseeker.jobseeker.Model.Jobapplication;
import com.jobseeker.jobseeker.Repo.Jobapplicationrepo;

@Service
public class Jobapplicationserviceimpl {

  @Autowired
  private Jobapplicationrepo repo;

  public List<Jobapplication> getallapplications() {
    return repo.findAll();
  }

  public Jobapplication findById(String id) {
    return repo.findById(id).get();
  }

  public void deleteApplication(Jobapplication jobapplication) {
    repo.delete(jobapplication);
  }

  public void addJobApplication(Jobapplication jobapplication) {

    repo.save(jobapplication);
  }

  public void updateJobApplication(Jobapplication storedJobapplication) {

    repo.save(storedJobapplication);
  }

}
