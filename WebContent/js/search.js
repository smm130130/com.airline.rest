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
	//var $post_example = $('#search');

	/**
	 * This is for the Submit button
	 * It will trigger a ajax POST call to: api/v2/inventory
	 * This will submit a item entry to our inventory database
	 */
	$('#submit_it').live('click',(function(e) {
		//console.log("submit button has been clicked");
		e.preventDefault(); //cancel form submit
		
			
		//var jsObj = $post_example.serializeObject()
		//, ajaxObj = {};

		//console.log(jsObj);
		var source = $("#sourceId").val();
		var dest = $("#destId").val();
		
		var jsObj = {"source":source,
					 "dest":dest};

		var isValSearch = isValidSearch(source,dest);
		if(isValSearch == 1){
			ajaxObj = {  
					type: "POST",
					//url: "http://localhost:8080/com.airline.rest/api/v1/search/", 
					url: "https://localhost:8443/com.airline.rest/api/v1/search/",
					data: JSON.stringify(jsObj), 
					contentType:"application/json",
					error: function(jqXHR, textStatus, errorThrown) {
				console.log("Error " + jqXHR.getAllResponseHeaders() + " " + errorThrown);
			},
			success: function(data) { 
				//console.log(data);
				if(data != ""){
					//alert("data is :"+data);
					var len = data.length;
					var txt = "";
					if(len > 0){
						for(var i=0;i<len;i++){
							if(data[i].FlightId){
								txt += "<tr><td class=nr align=center>"+data[i].FlightId+"</td><td class=ns align=center>"+data[i].Source+"</td>" +
								"<td class=nd align=center>"+data[i].Destination+"</td><td class=nt align=center>"+data[i].StartTime+"</td>" +
								"<td align=center>"+data[i].EndTime+"</td><td align=center>"+data[i].Fare+"$</td>" +
								"<td align=center><input type=button id=bookTicket name=bookTicket value=BookTicket></td></tr>";
							}
						}
						if(txt != ""){
							$("#table1").append(txt);
							$("#tableSearch").removeClass("hidden");
							$("td").addClass("tbl");
							$("#info").addClass("hidden");
							//alert("am coming after complete "+data[0].FlightId);
						}
					}
				} else {
					window.location.assign("NoFlights.html");
				}
			},
			complete: function(XMLHttpRequest) {
				//console.log( XMLHttpRequest.getAllResponseHeaders() );
			}, 
			dataType: "json" //request JSON
			};

			$.ajax(ajaxObj);
		}
	}));
	
	$('#login').live('click',(function(e) {
		//console.log("submit button has been clicked");
		e.preventDefault(); //cancel form submit
		
			
		//var jsObj = $post_example.serializeObject()
		//, ajaxObj = {};

		//console.log(jsObj);
		var username = $("#username").val();
		var pwd = $("#pwd").val();
		
		var jsObj = {"username":username,
					 "pwd":pwd};

		var isValSearch = isValidUser(username,pwd);
		if(isValSearch == 1){
			ajaxObj = {  
					type: "POST",
					//url: "http://localhost:8080/com.airline.rest/api/v1/search/", 
					url: "https://localhost:8443/com.airline.rest/api/v1/agentLogin/",
					data: JSON.stringify(jsObj), 
					contentType:"application/json",
					error: function(jqXHR, textStatus, errorThrown) {
				console.log("Error " + jqXHR.getAllResponseHeaders() + " " + errorThrown);
			},
			success: function(data) { 
				//console.log(data);
				if(data != ""){
					//alert("data is :"+data);
					var len = data.length;
					var txt = "";
					if(len > 0){
						if (typeof(Storage) != "undefined"){
							sessionStorage.setItem("agentLogin",JSON.stringify(data));
						}
						window.location.assign("displayAgent.html");
					}
				} else {
					window.location.assign("NoAgent.html");
				}
			},
			complete: function(XMLHttpRequest) {
				//console.log( XMLHttpRequest.getAllResponseHeaders() );
			}, 
			dataType: "json" //request JSON
			};

			$.ajax(ajaxObj);
		}
	}));

	$('#bookTicket').live('click',(function(e) {

		var FlightId = $(this).closest('tr').find(".nr:first").text();
		var Source = $(this).closest('tr').find(".ns:first").text();
		var Destination = $(this).closest('tr').find(".nd:first").text();
		var StartTime = $(this).closest('tr').find(".nt:first").text();
		if (typeof(Storage) != "undefined"){
			localStorage.setItem("FlightId",FlightId);
			localStorage.setItem("source",Source);
			localStorage.setItem("destination",Destination);
			localStorage.setItem("time",StartTime);
		}
		//alert("am coming :"+FlightId);
		window.location.assign("bookUserTicket.html");

	}));
	
	
	$('#agent').live('click',(function(e) {
	$("#search").addClass("hidden");
	$("#ticket").addClass("hidden");
    $("#bookId	").addClass("hidden");	
	$("#BookingId").addClass("hidden");
	$("#getTicket").addClass("hidden");
	$("#test").addClass("hidden");
	$("#agent").addClass("hidden");
	$("#searchAgent").removeClass("hidden");
	
	}));
	
	$('#searchbk').live('click',(function(e) {
	$("#search").removeClass("hidden");
	$("#ticket").removeClass("hidden");
    $("#bookId	").removeClass("hidden");	
	$("#BookingId").removeClass("hidden");
	$("#getTicket").removeClass("hidden");
	$("#test").removeClass("hidden");
	$("#agent").removeClass("hidden");
	$("#searchAgent").addClass("hidden");
	
	}));
});