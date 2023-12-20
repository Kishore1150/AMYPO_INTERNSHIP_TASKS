package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.PassengerDetails;

public interface PassengerdetailsInterface {

	
	
	// To save flight details
	public PassengerDetails saveAllPassengerDetails(PassengerDetails passengerflights);

	// To get all the flight details from the list
	public List<PassengerDetails> findAllPassengers();

	// To update all the flight details
	public PassengerDetails updateAllPassengerDetails(PassengerDetails passengerflights);

	// TO delete the flight details
	public String deleteAllPassengerDetails(int id);


}
