
package com.jobseeker.jobseeker.Model;

import java.util.Date;

import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table
@Data
@NoArgsConstructor
@Entity
@AllArgsConstructor
public class Jobapplication {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;
  private String firstName;
  private String lastName;
  private String userImage;
  private String mobileNumber;
  private String email;
  private String portfolioLink;
  private String applyPosition;
  private String expectedSalary;
  private String address;
  private String dob;
  private String relocate;
  private String previousCompanyName;
  private String comments;
  @CreatedDate
  @Temporal(TemporalType.TIMESTAMP)
  @Column(nullable = false, updatable = false)
  private Date createdAt;

  @PrePersist
  protected void onCreate() {
    createdAt = new Date();
  }

}
