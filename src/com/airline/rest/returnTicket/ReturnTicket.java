package com.airline.rest.returnTicket;


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

@Path("/v1/return")
public class ReturnTicket extends DBConnect{
	/**
	 * This method will allow you to insert data the PC_PARTS table.
	 * This is a example of using JSONArray and JSONObject
	 * 
	 * Note: This is apart of the Jersey version 1 but I'm not sure if
	 * 			its apart of the version 2 Jersey.  Go to http://json.org/java/
	 * 			if you need the source files.
	 * 
	 * @param incomingData
	 * @return
	 * @throws Exception
	 */
	@POST
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON})
	@Produces(MediaType.APPLICATION_JSON)
	public Response returnTicket(String incomingData) throws Exception {

		String returnString = null;
		JSONArray jsonArray = new JSONArray();
		Schemas dao = new Schemas();

		try {

			/*
			 * We can create a new instance and it will accept a JSON string
			 * By doing this, we can now access the data.
			 */
			JSONObject partsData = new JSONObject(incomingData);
			System.out.println( "jsonData: " + partsData.toString() );

			/*
			 * In order to access the data, you will need to use one of the method in JSONArray
			 * or JSONObject.  I recommend using the optXXXX methods instead of the get method.
			 */
			jsonArray = dao.queryReturnBookingDetails(partsData.optString("BookingId"));
			returnString = jsonArray.toString();


			System.out.println( "returnTicket: " + returnString );

		} catch(Exception e) {
			e.printStackTrace();
			return Response.status(500).entity("Server was not able to process your request").build();
		}

		return Response.ok(jsonArray).build();
	}
}
