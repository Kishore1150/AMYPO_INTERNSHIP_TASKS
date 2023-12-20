package com.example.demo.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.example.demo.repository.Flightrepository;
//import com.example.demo.repository.Flightdetailsrepository;
import com.example.demo.serviceimplementation.FlightServiceImpl;

@RestController
@CrossOrigin("*")
public class Controller {

	@Autowired
	FlightServiceImpl flightserviceimpl;

	@Autowired
	Flightrepository flightrepostiory;

//	@Autowired
//	private Flightdetailsrepository flightdetailsrepository;

	@GetMapping("/")
	public String Welcome() {
		return "WELCOME TO MY PAGE THIS PAGE DISPLAYS THE FLIGHT DETAILS";
	}

	@GetMapping(value = "/getflightdetails")
	public List<Flight> findAllFlightDetails() {
		return flightserviceimpl.fetchAllFlights();
	}

	@GetMapping(value = "/pagingflight/{pageNo}/{pageSize}")
	Page<Flight> FlightPaging(@PathVariable("pageNo") int pageno, @PathVariable("pageSize") int pageSize) {
		return flightserviceimpl.pagingFlight(pageno, pageSize);

	}

	@GetMapping(value = "/pagingandsorting/{pageNo}/{pageSize}/{field}")
	Page<Flight> FlightPagingAndSorting(@PathVariable("pageNo") int pageno, @PathVariable("pageSize") int pageSize,
			@PathVariable("field") String field) {
		return flightserviceimpl.pagingAndSortingFlight(pageno, pageSize, field);
	}

	@GetMapping(value = "/sortflights/{field}")
	Iterable<Flight> sortFlights(@PathVariable("field") String field) {
		return flightserviceimpl.sortFlights(field);
	}

	@GetMapping("/getflightdetails/{id}")
	public ResponseEntity<Flight> getEmployeeById(@PathVariable int id) throws Exception {
		Flight f1 = flightserviceimpl.findById(id).orElseThrow(() -> new Exception("Flight not exist with id:" + id));
		return ResponseEntity.ok(f1);
	}

	@DeleteMapping("/deleteflights/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteflights(@PathVariable int id) throws Exception {
		Flight f1 = flightserviceimpl.findById(id).orElseThrow(() -> new Exception("Flight not exist with id :" + id));

		flightrepostiory.delete(f1);
		Map<String, Boolean> response = new HashMap<>();
		response.put("Flight detail" + id + "deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/getflightdetails/flightbooking")
	public ResponseEntity<List<Flight>> findByFlightBooking() {
		try {
			List<Flight> f1 = new ArrayList<>();
			List<Flight> allFlight = flightserviceimpl.fetchAllFlights();

			for (Flight flight : allFlight) {
				if (flight.getFlightbooking().equalsIgnoreCase("available"))
					f1.add(flight);
			}
			if (f1.isEmpty()) {

				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(f1, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/getflightdetails/chennai")
	public ResponseEntity<List<Flight>> findByDepartureCity() {
		try {
			List<Flight> f1 = new ArrayList<>();
			List<Flight> allFlight = flightserviceimpl.fetchAllFlights();

			for (Flight flight : allFlight) {
				if (flight.getDeparturecity().equalsIgnoreCase("Chennai")
						&& flight.getFlightbooking().equalsIgnoreCase("available"))
					f1.add(flight);
			}

			if (f1.isEmpty()) {
				System.out.println("There is no flights available for chennai");
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(f1, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/getflightdetails/coimbatore")
	public ResponseEntity<List<Flight>> findByDepartureCity1() {
		try {
			List<Flight> f1 = new ArrayList<>();
			List<Flight> allFlight = flightserviceimpl.fetchAllFlights();

			for (Flight flight : allFlight) {
				if (flight.getDeparturecity().equalsIgnoreCase("coimbatore")
						&& flight.getFlightbooking().equalsIgnoreCase("available"))
					f1.add(flight);
			}

			if (f1.isEmpty()) {
				System.out.println("There is no flights available for coimbatore");
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(f1, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/getflightdetails/salem")
	public ResponseEntity<List<Flight>> findByDepartureCity2() {
		try {
			List<Flight> f1 = new ArrayList<>();
			List<Flight> allFlight = flightserviceimpl.fetchAllFlights();

			for (Flight flight : allFlight) {
				if (flight.getDeparturecity().equalsIgnoreCase("salem")
						&& flight.getFlightbooking().equalsIgnoreCase("available"))
					f1.add(flight);
			}

			if (f1.isEmpty()) {
				System.out.println("There is no flights available for salem");
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(f1, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/getflightdetails/madurai")
	public ResponseEntity<List<Flight>> findByDepartureCity3() {
		try {
			List<Flight> f1 = new ArrayList<>();
			List<Flight> allFlight = flightserviceimpl.fetchAllFlights();

			for (Flight flight : allFlight) {
				if (flight.getDeparturecity().equalsIgnoreCase("madurai")
						&& flight.getFlightbooking().equalsIgnoreCase("available"))
					f1.add(flight);
			}

			if (f1.isEmpty()) {
				System.out.println("There is no flights available for madurai");
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(f1, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/getflightdetails/airindia")
	public ResponseEntity<List<Flight>> findByFlightname() {
		try {
			List<Flight> f1 = new ArrayList<>();
			List<Flight> allFlight = flightserviceimpl.fetchAllFlights();

			for (Flight flight : allFlight) {
				if (flight.getAirlinename().equalsIgnoreCase("airindia")
						&& flight.getFlightbooking().equalsIgnoreCase("available"))
					f1.add(flight);
			}
			if (f1.isEmpty()) {
				System.out.println("There is no flights available for airindia");
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(f1, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/getflightdetails/indigo")
	public ResponseEntity<List<Flight>> findByFlightname1() {
		try {
			List<Flight> f1 = new ArrayList<>();
			List<Flight> allFlight = flightserviceimpl.fetchAllFlights();

			for (Flight flight : allFlight) {
				if (flight.getAirlinename().equalsIgnoreCase("indigo")
						&& flight.getFlightbooking().equalsIgnoreCase("available"))
					f1.add(flight);
			}

			if (f1.isEmpty()) {
				System.out.println("There is no flights available for indigo");
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(f1, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/getflightdetails/spicejet")
	public ResponseEntity<List<Flight>> findByFlightname2() {
		try {
			List<Flight> f1 = new ArrayList<>();
			List<Flight> allFlight = flightserviceimpl.fetchAllFlights();

			for (Flight flight : allFlight) {
				if (flight.getAirlinename().equalsIgnoreCase("spicejet")
						&& flight.getFlightbooking().equalsIgnoreCase("available"))
					f1.add(flight);
			}

			if (f1.isEmpty()) {
				System.out.println("There is no flights available for spicejet");
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(f1, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/getflightdetails/airasia")
	public ResponseEntity<List<Flight>> findByFlightname3() {
		try {
			List<Flight> f1 = new ArrayList<>();
			List<Flight> allFlight = flightserviceimpl.fetchAllFlights();

			for (Flight flight : allFlight) {
				if (flight.getAirlinename().equalsIgnoreCase("airasia")
						&& flight.getFlightbooking().equalsIgnoreCase("available"))
					f1.add(flight);
			}

			if (f1.isEmpty()) {
				System.out.println("There is no flights available for airasia");
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(f1, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/getflightdetails/emirates")
	public ResponseEntity<List<Flight>> findByFlightname4() {
		try {
			List<Flight> f1 = new ArrayList<>();
			List<Flight> allFlight = flightserviceimpl.fetchAllFlights();

			for (Flight flight : allFlight) {
				if (flight.getAirlinename().equalsIgnoreCase("emirates")
						&& flight.getFlightbooking().equalsIgnoreCase("available"))
					f1.add(flight);
			}

			if (f1.isEmpty()) {
				System.out.println("There is no flights available for emirates");
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(f1, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/getflightdetails/jetairways")
	public ResponseEntity<List<Flight>> findByFlightname5() {
		try {
			List<Flight> f1 = new ArrayList<>();
			List<Flight> allFlight = flightserviceimpl.fetchAllFlights();

			for (Flight flight : allFlight) {
				if (flight.getAirlinename().equalsIgnoreCase("jetairways")
						&& flight.getFlightbooking().equalsIgnoreCase("available"))
					f1.add(flight);
			}

			if (f1.isEmpty()) {
				System.out.println("There is no flights available for jetairways");
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(f1, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/getflightdetails/gofirst")
	public ResponseEntity<?> findByFlightname6() {
		try {
			List<Flight> f1 = new ArrayList<>();
			List<Flight> allFlight = flightserviceimpl.fetchAllFlights();

			for (Flight flight : allFlight) {
				if (flight.getAirlinename().equalsIgnoreCase("go first")
						&& flight.getFlightbooking().equalsIgnoreCase("available"))
					f1.add(flight);
			}

			if (f1.isEmpty()) {
				System.out.println("There is no flights available for gofirst");
				return new ResponseEntity<String>("There is no flights available in gofirst", HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(f1, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/saveflightdetails")
	public ResponseEntity<Flight> saveUser(@RequestBody Flight f1) {

		if (flightserviceimpl.existsById(f1.getId())) {
			System.out.println("Flight already exists");
			throw new RuntimeException("Flight " + f1.getId() + " already exists");
		} else {
			System.out.println("Flight details has been saved");
			return new ResponseEntity<Flight>(flightserviceimpl.saveFlightDetails(f1), HttpStatus.CREATED);
		}
	}

	@PutMapping(value = "/updateflightdetails")
	public Flight updateFlightDetails(@RequestBody Flight flight) {
		System.out.println("Flight details has been updated");
		return flightserviceimpl.updateFlightDetails(flight);
	}

	@DeleteMapping(value = "/deleteflightdetails")
	public String deleteFlightDetails(@RequestParam int id) {
		return flightserviceimpl.deleteFlightDetails(id);

	}
}
