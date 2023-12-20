package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Flightdetails;


@Repository
public interface Flightdetailsrepository extends JpaRepository<Flightdetails, Integer> {
	Boolean existsById(int id);
	@Query("SELECT f FROM Flightdetails f WHERE f.id= ?1")
	public List<Flightdetails> findAllFlightsById(int id);


}