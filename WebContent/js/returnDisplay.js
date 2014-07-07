$(document).ready(function() {
	var data = localStorage.getItem("Data");
	data = JSON.parse(data);
	if(data){
		var len = data.length;
		var txt = "";
		//alert("am coming after complete "+(data[0].FlightId));
		if(len > 0){
			for(var i=0;i<len;i++){
				if(data[i].FlightId){
					txt += "<tr><td class=nr>"+data[i].BookingId+"</td><td class=ns>"+data[i].Name+"</td>" +
					"<td class=np>"+data[i].EmailId+"</td><td>"+data[i].DOB+"</td>" +
					"<td>"+data[i].PNumber+"</td><td>"+data[i].Address+"</td>" +
					"<td>"+data[i].FlightId+"</td>" +
					"<td><input type=button id=retrievedTicket name=retrievedTicket value=Cancel></td></tr>";
				}
			}
			if(txt != ""){
				$("#retrievedTicket").append(txt);
			}
		}
	}
	
	$('#retrievedTicket').die('click').live('click',(function(e) {
		var trid = $(this).closest('tr').find(".nr:first").text();
		var name = $(this).closest('tr').find(".ns:first").text();
		var email = $(this).closest('tr').find(".np:first").text();
		e.preventDefault(); //cancel form submit
		
		var jsObj = {"BookingId":trid,
					 "Name":name,
					 "Email":email};

		//console.log(jsObj);
		if(trid!=""){
			//alert("cancel clicked" + email);
		ajaxObj = {  
			type: "POST",
			//url: "http://localhost:8080/com.airline.rest/api/v1/cancelTicket/", 
			url: "https://localhost:8443/com.airline.rest/api/v1/cancelTicket/",
			data: JSON.stringify(jsObj), 
			contentType:"application/json",
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("Error " + jqXHR.getAllResponseHeaders() + " " + errorThrown);
			},
			success: function(data) { 
				if(data[0].HTTP_CODE == 200) {
					sessionStorage.setItem("CCNAME", data[0].NAME);
					sessionStorage.setItem("CCBOOKINGID", data[0].BOOKINGID);
					sessionStorage.setItem("CCEMAIL", data[0].EMAIL);
				}
				window.location.assign("CancelConfirmationPage.html");
			},
			complete: function(XMLHttpRequest) {
				//console.log( XMLHttpRequest.getAllResponseHeaders() );
			}, 
			dataType: "json" //request JSON
		};
		$.ajax(ajaxObj);
		}
	}));
});