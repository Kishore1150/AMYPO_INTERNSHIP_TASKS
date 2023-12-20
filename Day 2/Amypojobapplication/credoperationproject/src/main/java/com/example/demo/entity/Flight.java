package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Flights")
public class Flight {
	
	@Id
	private int id;
	@Column(name="flight_image")
	private String col1flightimage;
	@Column(name="flight_number")
	private String col2flightnumber;
	@Column(name="airline_name")
	private String col3airlinename;
	@Column(name="departure_city")
	private String col4departurecity;
	@Column(name="departure_time")
	private String col5departuretime;
	@Column(name="arrival_city")
	private String col6arrivalcity;
	@Column(name="arrival_time")
	private String col7arrivaltime;
	@Column(name="Total_seats")
	private int col8totalseats;
//	@Column(name="ticket_price")
//	private Float col9ticketprice;
	@Column(name="flight_booking")
	private String col9flightbooking;
	public Flight() {
		super();
	}
	public Flight(int id, String flightimage,String flightnumber,String airlinename, String departurecity, String departuretime,
			String arrivalcity, String arrivaltime, int totalseats, Float ticketprice, String flightbooking) {
		super();
		this.id = id;
		this.col1flightimage = flightimage;
		this.col2flightnumber = flightnumber;
		this.col3airlinename=airlinename;
		this.col4departurecity = departurecity;
		this.col5departuretime = departuretime;
		this.col6arrivalcity = arrivalcity;
		this.col7arrivaltime = arrivaltime;
		this.col8totalseats =totalseats;
//		this.col9ticketprice = ticketprice;
		this.col9flightbooking = flightbooking;
	}
	public String getAirlinename() {
		return col3airlinename;
	}
	public void setAirlinename(String airlinename) {
		this.col3airlinename = airlinename;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getFlightimage() {
		return col1flightimage;
	}
	public void setFlightimage(String flightimage) {
		this.col1flightimage = flightimage;
	}
	public String getFlightnumber() {
		return col2flightnumber;
	}
	public void setFlightnumber(String flightnumber) {
		this.col2flightnumber = flightnumber;
	}
	public String getDeparturecity() {
		return col4departurecity;
	}
	public void setDeparturecity(String departurecity) {
		this.col4departurecity = departurecity;
	}
	public String getDeparturetime() {
		return col5departuretime;
	}
	public void setDeparturetime(String departuretime) {
		this.col5departuretime = departuretime;
	}
	public String getArrivalcity() {
		return col6arrivalcity;
	}
	public void setArrivalcity(String arrivalcity) {
		this.col6arrivalcity = arrivalcity;
	}
	public String getArrivaltime() {
		return col7arrivaltime;
	}
	public void setArrivaltime(String arrivaltime) {
		this.col7arrivaltime = arrivaltime;
	}
	public int getTotalseats() {
		return col8totalseats;
	}
	public void setTotalseats(int totalseats) {
		this.col8totalseats = totalseats;
	}
//	public Float getTicketprice() {
//		return col9ticketprice;
//	}
//	public void setTicketprice(Float ticketprice) {
//		this.col9ticketprice = ticketprice;
//	}0
	public String getFlightbooking() {
		return col9flightbooking;
	}
	public void setFlightbooking(String flightbooking) {
		this.col9flightbooking = flightbooking;
	}
	@Override
	public String toString() {
		return "Flight [id=" + id + ", col1flightimage=" + col1flightimage + ", col2flightnumber=" + col2flightnumber
				+ ", col3flightname=" + col3airlinename + ", col4departurecity=" + col4departurecity
				+ ", col5departuretime=" + col5departuretime + ", col6arrivalcity=" + col6arrivalcity
				+ ", col7arrivaltime=" + col7arrivaltime + ", colS8totalseats=" + col8totalseats + ", col9flightbooking="
				+ col9flightbooking + "]";
	}

	
	
	
	

}
