
package com.jobseeker.jobseeker.Controller;

import java.lang.reflect.Field;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.jobseeker.jobseeker.Model.Jobapplication;
import com.jobseeker.jobseeker.Serviceimpl.Jobapplicationserviceimpl;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class Jobapplicationcontroller {

  @Autowired
  private Jobapplicationserviceimpl service;

  @GetMapping("/")
  public String Home() {
    return "Hi";
  }

  @GetMapping("/getallapplications")
  public List<Jobapplication> getallapplications() {
    return service.getallapplications();
  }

  @DeleteMapping("/deleteapplication/{id}")
  public ResponseEntity<?> deleteApplication(@PathVariable String id) {

    Jobapplication storedJobapplication = service.findById(id);
    if (storedJobapplication == null) {
      return new ResponseEntity<>("Application not found", HttpStatus.NOT_FOUND);
    }
    service.deleteApplication(storedJobapplication);
    return new ResponseEntity<>("Application deleted successfully", HttpStatus.OK);
  }

  @PostMapping("/addjobapplication")
  public ResponseEntity<?> addJobApplication(@RequestBody Jobapplication jobapplication) {

    service.addJobApplication(jobapplication);

    return new ResponseEntity<>("Application added successfully", HttpStatus.OK);
  }


  @PutMapping("/updatejobapplication/{id}")
  public ResponseEntity<?> updateJobApplication(@PathVariable String id, @RequestBody Jobapplication jobapplication) {

    Jobapplication storedJobapplication = service.findById(id);
    if(storedJobapplication==null)
    {
      return new ResponseEntity<>("Application not found",HttpStatus.NOT_FOUND);
    }
    updateJobFields(storedJobapplication, jobapplication);
    service.updateJobApplication(storedJobapplication);
    return new ResponseEntity<>("Application updated successfully", HttpStatus.OK);
  }

  private void updateJobFields(Jobapplication storedJobapplication, Jobapplication newApplication) {
    Class<?> userClass = Jobapplication.class;
    Field[] fields = userClass.getDeclaredFields();

    for (Field field : fields) {
      try {
        field.setAccessible(true);
        Object newValue = field.get(newApplication);
        if (newValue != null) {
          field.set(storedJobapplication, newValue);
        }
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      }
    }
  }

}
