package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Flight;

public interface FlightInterface {

	// To save flight details
	public Flight saveFlightDetails(Flight flight);

	// To get all the flight details from the list
	public List<Flight> fetchAllFlights();

	// To update all the flight details
	public Flight updateFlightDetails(Flight flight);

	// TO delete the flight details
	public String deleteFlightDetails(int id);

}
