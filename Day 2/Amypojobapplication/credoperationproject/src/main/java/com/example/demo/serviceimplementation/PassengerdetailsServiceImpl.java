package com.example.demo.serviceimplementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.PassengerDetails;
import com.example.demo.repository.Passengerrepository;

@Service
public class PassengerdetailsServiceImpl {
	
	
	@Autowired
	private Passengerrepository passengerrepository;

	public PassengerDetails saveAllFlightDetails(PassengerDetails passengers) {

		return passengerrepository.save(passengers);
	}

	public List<PassengerDetails> findAllPassengers() {
		// it returns a list so casting is needed
		return (List<PassengerDetails>) passengerrepository.findAll();
	}

	public PassengerDetails updateAllPassengerDetails(PassengerDetails passengers) {
		return passengerrepository.save(passengers);
	}
	public String deleteAllPassengerDetails(int id) {
		if (existsById(id)) {
			passengerrepository.deleteById(id);
			return "Passenger " + id + " is deleted";
		} else {
			return "Passenger " + id + " does not exist";
		}
	}


	public Optional<PassengerDetails> findById(int id) {
		return passengerrepository.findById(id);
	}

	public boolean existsById(int id) {
		Optional<PassengerDetails> passengerdetails = passengerrepository.findById(id);
		if (passengerdetails.isEmpty()) {
			return false;
		}
		return true;
	}

	public List<PassengerDetails> findByFlightNumber(String flightnumber) {
		// TODO Auto-generated method stub
		return passengerrepository.findAllByflightnumber(flightnumber);
	}


//	public List<PassengerDetails> getPassengersById(int id) {
//		return passengerrepository.findAllPassengersById(id);
//
//	}


}
