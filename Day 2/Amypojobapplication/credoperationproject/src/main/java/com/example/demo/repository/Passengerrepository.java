package com.example.demo.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.PassengerDetails;

public interface Passengerrepository extends JpaRepository<PassengerDetails, Integer>{
	Boolean existsById(int id);
//	@Query("SELECT fd FROM Passengerdetails fd WHERE fd.id= ?1")
//	public List<PassengerDetails> findAllPassengersById(int id);

	Optional<PassengerDetails> findByflightnumber(String flightnumber);

	List<PassengerDetails> findAllByflightnumber(String flightnumber);

}
