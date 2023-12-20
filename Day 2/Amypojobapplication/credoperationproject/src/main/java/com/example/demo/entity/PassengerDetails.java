package com.example.demo.entity;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "passengerdetails")
public class PassengerDetails {

	@Id
	private int id;
	@Column(name = "ticket_number")
	private String col1ticketnumber;
	@Column(name = "passenger_name")
	private String col2customername;
	@Column(name = "passenger_age")
	private int col3age;
	@Column(name = "passenger_phone_number")
	private long col4phonenumber;
	@Column(name = "passenger_address")
	private String col5address;
	@Column(name = "passenger_email")
	private String col6email;
	@Column(name="passenger_flight_number")
	private String flightnumber;

//	@ManyToOne(cascade = CascadeType.ALL)
//	@JoinColumn(name = "passenger_id")
////	  @MapsId
////	  @OnDelete(action = OnDeleteAction.CASCADE)
//	private Flight flights;

	public PassengerDetails() {
		super();
	}

	public PassengerDetails(int id, String col1ticketnumber, String col2customername, int col3age, long col4phonenumber,
		String col5address, String col6email, String flightnumber) {
	super();
	this.id = id;
	this.col1ticketnumber = col1ticketnumber;
	this.col2customername = col2customername;
	this.col3age = col3age;
	this.col4phonenumber = col4phonenumber;
	this.col5address = col5address;
	this.col6email = col6email;
	this.flightnumber = flightnumber;
}

	public String getFlightnumber() {
		return flightnumber;
	}

	public void setFlightnumber(String flightnumber) {
		this.flightnumber = flightnumber;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTicketnumber() {
		return col1ticketnumber;
	}

	public void setTicketnumber(String col1ticketnumber) {
		this.col1ticketnumber = col1ticketnumber;
	}

	public String getCustomername() {
		return col2customername;
	}

	public void setCustomername(String col2customername) {
		this.col2customername = col2customername;
	}

	public int getAge() {
		return col3age;
	}

	public void setAge(int col3age) {
		this.col3age = col3age;
	}

	public long getPhonenumber() {
		return col4phonenumber;
	}

	public void setPhonenumber(long col4phonenumber) {
		this.col4phonenumber = col4phonenumber;
	}

	public String getAddress() {
		return col5address;
	}

	public void setAddress(String col5address) {
		this.col5address = col5address;
	}

	public String getEmail() {
		return col6email;
	}

	public void setEmail(String col6email) {
		this.col6email = col6email;
	}
//
//	public Flight getFlights() {
//		return flights;
//	}
//
//	public void setFlights(Flight flights) {
//		this.flights = flights;
//	}

	@Override
	public String toString() {
		return "PassengerDetails [id=" + id + ", col1ticketnumber=" + col1ticketnumber + ", col2customername="
				+ col2customername + ", col3age=" + col3age + ", col4phonenumber=" + col4phonenumber + ", col5address="
				+ col5address + ", col6email=" + col6email +  "]";
	}

}
