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

import com.example.demo.entity.Flightdetails;
import com.example.demo.repository.Flightdetailsrepository;

@Service
public class FlightdetailsServiceImpl {

	@Autowired
	private Flightdetailsrepository flightdetailsrepository;

	public Flightdetails saveAllFlightDetails(Flightdetails flights) {

		return flightdetailsrepository.save(flights);
	}

	public List<Flightdetails> findAllFlights() {
		// it returns a list so casting is needed
		return (List<Flightdetails>) flightdetailsrepository.findAll();
	}

	public Flightdetails updateAllFlightDetails(Flightdetails flights) {
		return flightdetailsrepository.save(flights);
	}

	public String deleteAllFlightDetails(int id) {
		if (existsById(id)) {
			flightdetailsrepository.deleteById(id);
			return "flightdetails " + id + " is deleted";
		} else {
			return "flightdetails " + id + " does not exist";
		}
	}

	public Optional<Flightdetails> findById(int id) {
		return flightdetailsrepository.findById(id);
	}

	public boolean existsById(int id) {
		Optional<Flightdetails> flight = flightdetailsrepository.findById(id);
		if (flight.isEmpty()) {
			return false;
		}
		return true;
	}

	public Page<Flightdetails> pagingFlightDetails(int page, int pageSize) {
		Pageable paging = PageRequest.of(page, pageSize);
		return flightdetailsrepository.findAll(paging);
	}

	public Page<Flightdetails> pagingAndSortingFlightDetails(int pagenumber, int pageSize, String field) {
		Pageable paging = PageRequest.of(pagenumber, pageSize).withSort(Sort.by(field));
		return flightdetailsrepository.findAll(paging);
	}

	public Iterable<Flightdetails> sortFlightDetails(String field) {

		return flightdetailsrepository.findAll(Sort.by(Direction.ASC, field));
	}

	public List<Flightdetails> getFlightsById(int id) {
		return flightdetailsrepository.findAllFlightsById(id);

	}

}
