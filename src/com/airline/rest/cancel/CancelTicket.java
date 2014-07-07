package com.airline.rest.cancel;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;

import com.airline.dao.DBConnect;
import com.airline.dao.Schemas;
import com.airline.rest.bookTicket.SendEmail;

@Path("/v1/cancelTicket")
public class CancelTicket extends DBConnect{
	
	/*I will have to update the booking tables where i will store 
	users fullName, DOB, Phone_Number, Address, Email_ID and FlightId
	*/
	
	@POST
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON})
	@Produces(MediaType.APPLICATION_JSON)
	public Response cancelTicket(String incomingData) throws Exception {

		String returnString = null;
		JSONArray jsonArray = new JSONArray();
		JSONObject jsonObject = new JSONObject();
		Schemas dao = new Schemas();
		
		try {

			/*
			 * We can create a new instance and it will accept a JSON string
			 * By doing this, we can now access the data.
			 */
			JSONObject partsData = new JSONObject(incomingData);
			System.out.println( "jsonData: " + partsData.toString() );
			String BookingId = partsData.optString("BookingId");
			String Name = partsData.optString("Name");
			String Email = partsData.optString("Email");
			String Subject = "Cancellation Confirmation";
			String Body = "Your Ticket has been Cancelled. Your Booking Id was :";
			/*
			 * In order to access the data, you will need to use one of the method in JSONArray
			 * or JSONObject.  I recommend using the optXXXX methods instead of the get method.
			 */
			//Change the values to be passed
			int http_code = dao.deleteFromUsersBookings(partsData.optString("BookingId"));
			
			if( http_code == 200 ) {
				/*
				 * The put method allows you to add data to a JSONObject.
				 * The first parameter is the KEY (no spaces)
				 * The second parameter is the Value
				 */
				new SendEmail(BookingId, Email, Subject, Body);
				jsonObject.put("HTTP_CODE", "200");
				jsonObject.put("BOOKINGID", BookingId);
				jsonObject.put("NAME", Name);
				jsonObject.put("EMAIL", Email);
				/*
				 * When you are dealing with JSONArrays, the put method is used to add
				 * JSONObjects into JSONArray.
				 */
				returnString = jsonArray.put(jsonObject).toString();
			} else {
				return Response.status(500).entity("Unable to enter Item").build();
			}

		} catch(Exception e) {
			e.printStackTrace();
			return Response.status(500).entity("Server was not able to process your request").build();
		}

		return Response.ok(returnString).build();
	}
}
