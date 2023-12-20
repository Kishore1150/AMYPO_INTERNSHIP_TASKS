package com.example.demo.serviceimplementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Flight;
import com.example.demo.repository.Flightrepository;
import com.example.demo.service.FlightInterface;

@Service
public class FlightServiceImpl implements FlightInterface {

	@Autowired
	private Flightrepository rep;

	public Flight saveFlightDetails(Flight flight) {

		return rep.save(flight);
	}

	public List<Flight> fetchAllFlights() {
		// it returns a list so casting is needed
		return (List<Flight>) rep.findAll();
	}

	public Flight updateFlightDetails(Flight flight) {
		return rep.save(flight);
	}

	public String deleteFlightDetails(int id) {
		if (existsById(id)) {
			rep.deleteById(id);
			return "flight " + id + " is deleted";
		} else {
			return "flight " + id + " does not exist";
		}
	}

	public Optional<Flight> findById(int id) {
		return rep.findById(id);
	}

	public boolean existsById(int id) {
		Optional<Flight> flight = rep.findById(id);
		if (flight.isEmpty()) {
			return false;
		}
		return true;
	}

	public Page<Flight> pagingFlight(int page, int pageSize) {
		Pageable paging = PageRequest.of(page, pageSize);
		return rep.findAll(paging);
	}

	public Page<Flight> pagingAndSortingFlight(int pagenumber, int pageSize, String field) {
		Pageable paging = PageRequest.of(pagenumber, pageSize).withSort(Sort.by(field));
		return rep.findAll(paging);
	}

	public Iterable<Flight> sortFlights(String field) {

		return rep.findAll(Sort.by(Direction.ASC, field));
	}

}
