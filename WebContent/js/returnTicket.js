$(document).ready(function() {
	//console.log("ready");
	/**
	 * This is for the Submit button
	 * It will trigger a ajax POST call to: api/v2/inventory
	 * This will submit a item entry to our inventory database
	 */
	$('#getTicket').click(function(e) {
		//console.log("submit button has been clicked");
		e.preventDefault(); //cancel form submit

		var BookingId = $("#BookingId").val(); 

		var isExistsBookId = isExistsBookingId(BookingId);
		if(isExistsBookId == 1){	
			//alert("returnTicket : "+BookingId);
			var jsObj = {"BookingId":BookingId};

			//console.log(jsObj);

			ajaxObj = {  
					type: "POST",
					//url: "http://localhost:8080/com.airline.rest/api/v1/return/", 
					url: "https://localhost:8443/com.airline.rest/api/v1/return/",
					data: JSON.stringify(jsObj), 
					contentType:"application/json",
					error: function(jqXHR, textStatus, errorThrown) {
				console.log("Error " + jqXHR.getAllResponseHeaders() + " " + errorThrown);
			},
			success: function(data1) {
				if(data1 == ""){
					window.location.assign("NoTickets.html");
				} else {
					if (typeof(Storage) != "undefined"){
						localStorage.setItem("Data",JSON.stringify(data1));
					}
					window.location.assign("returnDisplay.html");
				}
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