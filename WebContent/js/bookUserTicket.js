/**
 * js file for post.html
 * Please use modern web browser as this file will not attempt to be
 * compatible with older browsers. Use Chrome and open javascript console
 * or Firefox with developer console.
 * 
 * jquery is required
 */
$(document).ready(function() {
	//console.log("ready");

	var SrcDestn = localStorage.getItem("source")+"-"+localStorage.getItem("destination");
	var travelDate = localStorage.getItem("time");
	var FlightId = localStorage.getItem("FlightId");
	$("#SrcDest").text(SrcDestn);
	$("#trvlDate").text(travelDate);
	$("#fltID").text(FlightId);
	
	var $post_example = $('#bookTicket');
	
	/**
	 * This is for the Submit button
	 * It will trigger a ajax POST call to: api/v2/inventory
	 * This will submit a item entry to our inventory database
	 */
	$('#submit_book').click(function(e) {
		//console.log("submit button has been clicked");
		
		e.preventDefault(); //cancel form submit
		
		var fullname = $("#fullname").val();
		var dob = $("#dob").val();
		var Email = $("#Email").val();
		var UserPhone = $("#UserPhone").val();
		var Address = $("#Address").val();
		var FlightId = localStorage.getItem("FlightId");
		
		var isVal = IsValid(fullname,dob,Email,UserPhone,Address);
		if(isVal == 1){
			var jsObj = {"fullname":fullname,
					 "dob":dob,
					 "Email":Email,
					 "UserPhone":UserPhone,
					 "Address":Address,
					 "FlightId":FlightId};

		//console.log(jsObj);

			ajaxObj = {  
			type: "POST",
			//url: "http://localhost:8080/com.airline.rest/api/v1/bookTicket/",
			url: "https://localhost:8443/com.airline.rest/api/v1/bookTicket/",
			data: JSON.stringify(jsObj), 
			contentType:"application/json",
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("Error " + jqXHR.getAllResponseHeaders() + " " + errorThrown);
			},
			success: function(data) { 
				//console.log(data);
				if(data[0].HTTP_CODE == 200) {
					sessionStorage.setItem("NAME", data[0].NAME);
					sessionStorage.setItem("EMAIL", data[0].EMAIL);
					sessionStorage.setItem("BOOKINGID", data[0].BOOKINGID);
				}
				window.location.assign("ConfirmationPage.html");
			},
			complete: function(XMLHttpRequest) {
				//console.log( XMLHttpRequest.getAllResponseHeaders() );
			}, 
			dataType: "json" //request JSON
		};
		$.ajax(ajaxObj);
		}
	});
	
});