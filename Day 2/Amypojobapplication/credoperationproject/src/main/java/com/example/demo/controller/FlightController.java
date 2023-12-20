
package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Flight;
import com.example.demo.entity.Flightdetails;
import com.example.demo.serviceimplementation.FlightServiceImpl;
import com.example.demo.serviceimplementation.FlightdetailsServiceImpl;

@CrossOrigin(origins = "*")
@RestController
public class FlightController {

	@Autowired
	FlightdetailsServiceImpl flightdetailsserviceimpl;


	@GetMapping(value = "flights/getflightdetails")
	public List<Flightdetails> findAllFlightDetails() {
		return flightdetailsserviceimpl.findAllFlights();
	}
	
	@GetMapping(value="/getflightsbyid/{id}")
	public List<Flightdetails> getEmployeesByDept(@PathVariable("id") int id)
	{
		List<Flightdetails> al=flightdetailsserviceimpl.getFlightsById(id);
		for(Flightdetails flights : al)
		{
		System.out.println(flights);
		}
		return al ;
	}
	
 
	@GetMapping({ "/flights/details/{id}", "/flights/{id}" })
	public ResponseEntity<Flightdetails> getFlightById(@PathVariable int id) throws Exception {
		Flightdetails f2 = flightdetailsserviceimpl.findById(id)
				.orElseThrow(() -> new Exception("Flight not exist with id:" + id));
		return ResponseEntity.ok(f2);
	}
	@GetMapping(value = "/pagingflightdetails/{pageNo}/{pageSize}")
	Page<Flightdetails> FlightdetailsPaging(@PathVariable("pageNo") int pageno, @PathVariable("pageSize") int pageSize) {
		return flightdetailsserviceimpl.pagingFlightDetails(pageno, pageSize);

	}

	@GetMapping(value = "/pagingandsortingdetails/{pageNo}/{pageSize}/{field}")
	Page<Flightdetails> FlightPagingAndSortingdetails(@PathVariable("pageNo") int pageno, @PathVariable("pageSize") int pageSize,
			@PathVariable("field") String field) {
		return flightdetailsserviceimpl.pagingAndSortingFlightDetails(pageno, pageSize, field);
	}

	@GetMapping(value = "/sortflightdetails/{field}")
	Iterable<Flightdetails> sortFlightdetails(@PathVariable("field") String field) {
		return flightdetailsserviceimpl.sortFlightDetails(field);
	}

	@GetMapping("flights/getflightdetails/low")
	public ResponseEntity<List<Flightdetails>> findByLowFare() {
		try {
			List<Flightdetails> f1 = new ArrayList<>();
			List<Flightdetails> allFlights = flightdetailsserviceimpl.findAllFlights();

			for (Flightdetails flightdetails : allFlights) {
				if (flightdetails.getFare().equalsIgnoreCase("low"))
//						&& flightdetails.getFlight().equals("available"))
					f1.add(flightdetails);
			}
			if (f1.isEmpty()) {
				System.out.println("There is no flights available for low fare ");
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(f1, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@GetMapping("flights/getflightdetails/high")
	public ResponseEntity<List<Flightdetails>> findByHighFare() {
		try {
			List<Flightdetails> f1 = new ArrayList<>();
			List<Flightdetails> allFlights = flightdetailsserviceimpl.findAllFlights();
			
			for (Flightdetails flightdetails : allFlights) {
				if (flightdetails.getFare().equalsIgnoreCase("high"))
//						&& flightdetails.getFlight().equals("available"))
					f1.add(flightdetails);
			}
			if (f1.isEmpty()) {
				System.out.println("There is no flights available for low fare ");
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(f1, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
//	@PostMapping("/flights/{id}")
//	public ResponseEntity<Flightdetails> createDetails(@PathVariable int id, @RequestBody Flightdetails detailsRequest)
//			throws Exception {
//		Flight f5 = flightserviceimpl.findById(id).orElseThrow(() -> new Exception("Flight not exist with id:" + id));
//
//		detailsRequest.setFlight(f5);
//		Flightdetails details = flightdetailsserviceimpl.saveAllFlightDetails(detailsRequest);
//
//		return new ResponseEntity<Flightdetails>(details, HttpStatus.CREATED);
//	}
	@PostMapping("flights/saveflighdetails")
	public ResponseEntity<Flightdetails> saveFlightDetails(@RequestBody Flightdetails f1) {

		if (flightdetailsserviceimpl.existsById(f1.getId())) {
			System.out.println("Flight already exists");
			throw new RuntimeException("Flight " + f1.getId() + " already exists");
		} else {
			System.out.println("Flight details has been saved");
			return new ResponseEntity<Flightdetails>(flightdetailsserviceimpl.saveAllFlightDetails(f1), HttpStatus.CREATED);
		}
	}

	
	@PutMapping(value = "flights/updateflightdetails")
	public Flightdetails updateFlightDetails(@RequestBody Flightdetails flights) {
		System.out.println("Flight details has been updated");
		return flightdetailsserviceimpl.updateAllFlightDetails(flights);
	}	

	@DeleteMapping(value = "flights/deleteflightdetails")
	public String deleteFlightDetails(@RequestParam int id) {
		return flightdetailsserviceimpl.deleteAllFlightDetails(id);

	}

}