package com.example.demo.entity;




import jakarta.persistence.*;

@Entity
@Table(name="flightdetails")
public class Flightdetails {

	@Id
	private Integer id;
	@Column(name="departure_date")
	private String col1departuredate;
	@Column(name="available_seats")
	private int col2availableseats;
	@Column(name="fare")
	private String col3fare;
	@Column(name="ticket_price")
	private String col4ticketprice;
//	
//	  @OneToOne(cascade = CascadeType.ALL)
//	  @MapsId
//	  @JoinColumn(name = "flight_id")
//	  private Flight flight;


	public Flightdetails() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Flightdetails(int id, String col1departuredate, int col2availableseats, String col3fare,
			String col4ticketprice, Flight flight) {
		super();
		this.id = id;
		this.col1departuredate = col1departuredate;
		this.col2availableseats = col2availableseats;
		this.col3fare = col3fare;
		this.col4ticketprice = col4ticketprice;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getDeparturedate() {
		return col1departuredate;
	}


	public void setDeparturedate(String col1departuredate) {
		this.col1departuredate = col1departuredate;
	}


	public int getAvailableseats() {
		return col2availableseats;
	}


	public void setAvailableseats(int col2availableseats) {
		this.col2availableseats = col2availableseats;
	}


	public String getFare() {
		return col3fare;
	}


	public void setFare(String col3fare) {
		this.col3fare = col3fare;
	}


	public String getTicketprice() {
		return col4ticketprice;
	}


	public void setTicketprice(String col4ticketprice) {
		this.col4ticketprice = col4ticketprice;
	}


//	public Flight getFlight() {
//		return flight;
//	}
//
//
//	public void setFlight(Flight flight) {
//		this.flight = flight;
//	}
//
//	@Override
//	public String toString() {
//		return "Flightdetails [id=" + id + ", departuredate=" + col1departuredate + ", availableseats="
//				+ col2availableseats + ", fare=" + col3fare + ", ticketprice=" + col4ticketprice + ", flight="
//				+ flight + "]";
//	}

    
}
