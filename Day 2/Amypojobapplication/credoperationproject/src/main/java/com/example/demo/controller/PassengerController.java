package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.example.demo.entity.PassengerDetails;
import com.example.demo.serviceimplementation.FlightServiceImpl;
import com.example.demo.serviceimplementation.PassengerdetailsServiceImpl;

@CrossOrigin(origins = "*")
@RestController
public class PassengerController {
	
	@Autowired
	PassengerdetailsServiceImpl passengerdetailsserviceimpl;
	@Autowired
	private FlightServiceImpl flightserviceimpl;

	@GetMapping(value = "passengers/getpassengerdetails")
	public List<PassengerDetails> findAllPassengerDetails() {
		return passengerdetailsserviceimpl.findAllPassengers();
	}
//	
//	@GetMapping(value="/getpassengersbyid/{id}")
//	public List<PassengerDetails> getPassengersById(@PathVariable("id") int id)
//	{
//		List<PassengerDetails> pd=passengerdetailsserviceimpl.getPassengersById(id);
//		for(PassengerDetails passengers : pd)
//		{
//		System.out.println(pd);
//		}
//		return pd ;
//	}
	
 
	@GetMapping({ "/passengers/details/{id}", "/passengers/{id}" })
	public ResponseEntity<PassengerDetails> getPassengersById(@PathVariable int id) throws Exception {
		PassengerDetails f10 = passengerdetailsserviceimpl.findById(id)
				.orElseThrow(() -> new Exception("passenger not exist with id:" + id));
		return ResponseEntity.ok(f10);
	}
	@GetMapping({ "/passengers/flightnumber/{flightnumber}" })
	public ResponseEntity<List<PassengerDetails>> getPassengersById(@PathVariable String flightnumber) throws Exception {
		List<PassengerDetails> f10 = (List<PassengerDetails>) passengerdetailsserviceimpl.findByFlightNumber(flightnumber);
		return ResponseEntity.ok(f10);
	}
//	@GetMapping(value = "/pagingflightdetails/{pageNo}/{pageSize}")
//	Page<Flightdetails> FlightdetailsPaging(@PathVariable("pageNo") int pageno, @PathVariable("pageSize") int pageSize) {
//		return flightdetailsserviceimpl.pagingFlightDetails(pageno, pageSize);
//
//	}
//
//	@GetMapping(value = "/pagingandsortingdetails/{pageNo}/{pageSize}/{field}")
//	Page<Flightdetails> FlightPagingAndSortingdetails(@PathVariable("pageNo") int pageno, @PathVariable("pageSize") int pageSize,
//			@PathVariable("field") String field) {
//		return flightdetailsserviceimpl.pagingAndSortingFlightDetails(pageno, pageSize, field);
//	}
//
//	@GetMapping(value = "/sortflightdetails/{field}")
//	Iterable<Flightdetails> sortFlightdetails(@PathVariable("field") String field) {
//		return flightdetailsserviceimpl.sortFlightDetails(field);
//	}
//
//	@GetMapping("flights/getflightdetails/low")
//	public ResponseEntity<List<Flightdetails>> findByLowFare() {
//		try {
//			List<Flightdetails> f1 = new ArrayList<>();
//			List<Flightdetails> allFlights = flightdetailsserviceimpl.findAllFlights();
//
//			for (Flightdetails flightdetails : allFlights) {
//				if (flightdetails.getFare().equalsIgnoreCase("low"))
//					f1.add(flightdetails);
//			}
//			if (f1.isEmpty()) {
//				System.out.println("There is no flights available for low fare ");
//				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//			}
//			return new ResponseEntity<>(f1, HttpStatus.OK);
//		} catch (Exception e) {
//			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//	}
//	@GetMapping("flights/getflightdetails/high")
//	public ResponseEntity<List<Flightdetails>> findByHighFare() {
//		try {
//			List<Flightdetails> f1 = new ArrayList<>();
//			List<Flightdetails> allFlights = flightdetailsserviceimpl.findAllFlights();
//			
//			for (Flightdetails flightdetails : allFlights) {
//				if (flightdetails.getFare().equalsIgnoreCase("high"))
//					f1.add(flightdetails);
//			}
//			if (f1.isEmpty()) {
//				System.out.println("There is no flights available for low fare ");
//				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//			}
//			return new ResponseEntity<>(f1, HttpStatus.OK);
//		} catch (Exception e) {
//			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//	}
	
//	@PostMapping("/passengers/{id}")
//	public ResponseEntity<PassengerDetails> createDetails(@PathVariable int id, @RequestBody PassengerDetails detailsRequest)
//			throws Exception {
//		Flight f5 = flightserviceimpl.findById(id).orElseThrow(() -> new Exception("Flight not exist with id:" + id));
//
//		detailsRequest.setFlights(f5);
//		PassengerDetails details = passengerdetailsserviceimpl.saveAllFlightDetails(detailsRequest);
//
//		return new ResponseEntity<PassengerDetails>(details, HttpStatus.CREATED);
//	}

	@PutMapping(value = "passengers/updatepassengerdetails")
	public PassengerDetails updatePassengerDetails(@RequestBody PassengerDetails passengerdetails) {
		System.out.println("Flight details has been updated");
		return passengerdetailsserviceimpl.updateAllPassengerDetails(passengerdetails);
	}

	@DeleteMapping(value = "passengers/deletepassengerdetails")
	public String deletePassengerDetails(@RequestParam int id) {
		return passengerdetailsserviceimpl.deleteAllPassengerDetails(id);

	}

}
