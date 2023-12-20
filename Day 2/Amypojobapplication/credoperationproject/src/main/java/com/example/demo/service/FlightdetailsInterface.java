package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Flightdetails;

public interface FlightdetailsInterface {

	// To save flight details
	public Flightdetails saveAllFlightDetails(Flightdetails flights);

	// To get all the flight details from the list
	public List<Flightdetails> findAllFlights();

	// To update all the flight details
	public Flightdetails updateAllFlightDetails(Flightdetails flights);

	// TO delete the flight details
	public String deleteAllFlightDetails(int id);
	
}
