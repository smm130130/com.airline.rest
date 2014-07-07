package com.airline.dao;

import java.sql.*;

import org.codehaus.jettison.json.JSONArray;

import com.airline.util.ToJSON;

/**
 * This java class will hold all the sql queries from episode 5 and onward.
 * V1_inventory.java and V1_status.java will not use this class for its sql code
 * since they were created before episode 5.
 * 
 * Having all sql/database code in one package makes it easier to maintain and audit
 * but increase complexity.
 * 
 * Note: we also used the extends Oracle308tube on this java class to inherit all
 * the methods in Oracle308tube.java
 * 
 * @author 308tube
 */
public class Schemas extends DBConnect {
	
	/**
	 * This method will search for the flight details given source and 
	 * destination from flight table.
	 * 
	 * By using prepareStatement and the ?, we are protecting against sql injection
	 * 
	 * Never add parameter straight into the prepareStatement
	 * 
	 * @param src - flight source
	 * @param dest - flight destination
	 * @return - json array of the results from the database
	 * @throws Exception
	 */
	public JSONArray queryReturnFlightDetails(String src, String dest) throws Exception {

		PreparedStatement query = null;
		Connection conn = null;

		ToJSON converter = new ToJSON();
		JSONArray json = new JSONArray();

		try {
			conn = DBConnection();
			query = conn.prepareStatement("select * from airreservation.flight where UPPER(Source)=? and UPPER(Destination)=?");

			/*
			 * protect against sql injection
			 * when you have more than one ?, it will go in chronological
			 * order.
			 */
			query.setString(1, src.toUpperCase()); //first ?
			query.setString(2, dest); //second ?
			ResultSet rs = query.executeQuery();

			json = converter.toJSONArray(rs);
			query.close(); //close connection
		}
		catch(SQLException sqlError) {
			sqlError.printStackTrace();
			return json;
		}
		catch(Exception e) {
			e.printStackTrace();
			return json;
		}
		return json;
	}
	
	public int insertIntoUsersBookings(String BookingId, String Name, String EmailId,
			String DOB, String PNumber, String Address, String FlightId)
			throws Exception {

		PreparedStatement query = null;
		Connection conn = null;

		try {
			/*
			 * If this was a real application, you should do data validation
			 * here before starting to insert data into the database.
			 */

			conn = DBConnection();
			query = conn
					.prepareStatement("insert into airreservation.usersBooking "
							+ "(BookingId, Name, EmailId, DOB, PNumber, Address, FlightId) "
							+ "VALUES ( ?, ?, ?, ?, ?, ?, ? ) ");

			query.setString(1, BookingId);
			query.setString(2, Name);
			query.setString(3, EmailId);
			query.setString(4, DOB);

			// PC_PARTS_AVAIL is a number column, so we need to convert the
			// String into a integer
			query.setString(5, PNumber);

			query.setString(6, Address);
			query.setString(7, FlightId);
			query.executeUpdate(); // note the new command for insert statement

		} catch (Exception e) {
			e.printStackTrace();
			return 500; // if a error occurs, return a 500
		}
		System.out.println("returing success");
		return 200;
	}
	
	public JSONArray queryReturnBookingDetails(String BookingId) throws Exception {

		PreparedStatement query = null;
		Connection conn = null;

		ToJSON converter = new ToJSON();
		JSONArray json = new JSONArray();

		try {
			conn = DBConnection();
			query = conn.prepareStatement("select * from airreservation.usersBooking where UPPER(BookingId)=?");

			/*
			 * protect against sql injection
			 * when you have more than one ?, it will go in chronological
			 * order.
			 */
			query.setString(1, BookingId.toUpperCase()); //first ?
			
			ResultSet rs = query.executeQuery();

			json = converter.toJSONArray(rs);
			query.close(); //close connection
		}
		catch(SQLException sqlError) {
			sqlError.printStackTrace();
			return json;
		}
		catch(Exception e) {
			e.printStackTrace();
			return json;
		}
		return json;
	}
	
	public int deleteFromUsersBookings(String BookingId)
			throws Exception {

		PreparedStatement query = null;
		Connection conn = null;

		try {
			/*
			 * If this was a real application, you should do data validation
			 * here before starting to insert data into the database.
			 */

			conn = DBConnection();
			query = conn
					.prepareStatement("delete from airreservation.usersBooking where BookingId = ?");

			query.setString(1, BookingId);
			query.executeUpdate(); // note the new command for insert statement

		} catch (Exception e) {
			e.printStackTrace();
			return 500; // if a error occurs, return a 500
		}
		System.out.println("returing cancel success");
		return 200;
	}
	
	public JSONArray queryReturnAgentDetails(String username, String pwd) throws Exception {

		PreparedStatement query = null;
		PreparedStatement query1 = null;
		Connection conn = null;

		ToJSON converter = new ToJSON();
		JSONArray json = new JSONArray();

		try {
			conn = DBConnection();
			query1 = conn.prepareStatement("select * from airreservation.agent where username = ? and userpwd = ?");
			query1.setString(1, username);
			query1.setString(2, pwd);
			ResultSet rs1 = query1.executeQuery();
			
			if(rs1.next()){
			query = conn.prepareStatement("select * from airreservation.usersbooking");

			/*
			 * protect against sql injection
			 * when you have more than one ?, it will go in chronological
			 * order.
			 */
			
			ResultSet rs = query.executeQuery();
			
			json = converter.toJSONArray(rs);
			query.close(); //close connection
		} 
		} 
		catch(SQLException sqlError) {
			sqlError.printStackTrace();
			return json;
		}
		catch(Exception e) {
			e.printStackTrace();
			return json;
		}
		return json;
	}
}